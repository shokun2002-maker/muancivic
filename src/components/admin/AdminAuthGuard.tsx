"use client";

import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getAdminProfileByUserId, AdminProfile } from "@/lib/auth/admin";
import AdminLoading from "./AdminLoading";

// Public routes that do not require admin authentication
export const publicAdminPaths = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
];

interface AdminContextType {
  adminProfile: AdminProfile | null;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType>({
  adminProfile: null,
  loading: true,
});

export const useAdmin = () => useContext(AdminContext);

interface Props {
  children: ReactNode;
}

export default function AdminAuthGuard({ children }: Props) {
  // All hooks are declared first
  const router = useRouter();
  const pathname = usePathname();
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Determine if current route is public
  const isPublicAdminPath = publicAdminPaths.includes(pathname);

  // Effect always runs
  useEffect(() => {
    // Skip auth checks for public routes
    if (isPublicAdminPath) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        setLoading(true);
        const supabase = createClient();
        if (!supabase) {
          router.push("/admin/login?error=config");
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          router.push("/admin/login");
          return;
        }

        const profile = await getAdminProfileByUserId(session.user.id);
        if (!profile) {
          await supabase.auth.signOut();
          router.push("/admin/login?error=no_permission");
          return;
        }

        setAdminProfile(profile);
      } catch (error) {
        console.error("AdminAuthGuard error:", error);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [isPublicAdminPath, router]);

  // Rendering phase – public routes render children immediately
  if (isPublicAdminPath) {
    return <>{children}</>;
  }

  // Protected routes handling
  if (loading) {
    return <AdminLoading message="관리자 세션 및 접근 권한을 확인하고 있습니다..." />;
  }

  if (!adminProfile) {
    return null;
  }

  return (
    <AdminContext.Provider value={{ adminProfile, loading }}>
      {children}
    </AdminContext.Provider>
  );
}
