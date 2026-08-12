"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getAdminProfileByUserId, AdminProfile } from "@/lib/auth/admin";
import AdminLoading from "./AdminLoading";

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
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If on /admin/login page, do not guard
    if (pathname === "/admin/login") {
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

        const { data: { session } } = await supabase.auth.getSession();

        if (!session || !session.user) {
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
      } catch (err) {
        console.error("AdminAuthGuard error:", err);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

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
