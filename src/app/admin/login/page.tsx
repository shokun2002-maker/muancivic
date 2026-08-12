"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getAdminProfileByUserId } from "@/lib/auth/admin";
import { Shield, Lock, Mail, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorType = searchParams.get("error");
    if (errorType === "no_permission") {
      setErrorMessage("관리자 권한이 없습니다. (Supabase Dashboard에서 admin_profiles를 확인하세요)");
    } else if (errorType === "config") {
      setErrorMessage("Supabase 환경변수가 설정되지 않았습니다.");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        setErrorMessage("Supabase 클라이언트를 초기화할 수 없습니다.");
        setLoading(false);
        return;
      }

      // 1. Supabase Auth Sign In
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        setErrorMessage("이메일 또는 비밀번호를 확인해주세요.");
        setLoading(false);
        return;
      }

      // 2. Check public.admin_profiles authorization
      const adminProfile = await getAdminProfileByUserId(data.user.id);

      if (!adminProfile) {
        // Auth logged in, but not an admin profile in admin_profiles table!
        await supabase.auth.signOut();
        setErrorMessage("관리자 권한이 없습니다.");
        setLoading(false);
        return;
      }

      // 3. Success -> Navigate to /admin dashboard
      router.push("/admin");
    } catch (err) {
      console.error("Login catch error:", err);
      setErrorMessage("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Branding */}
      <div className="text-center space-y-3">
        <div className="inline-flex p-4 bg-[#0D4938] rounded-2xl shadow-md text-white">
          <Image
            src="/logo.png"
            alt="무안 자치주권시민연대 로고"
            width={140}
            height={42}
            className="h-10 w-auto object-contain brightness-0 invert"
          />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5" />
            ADMINISTRATOR AUTHENTICATION
          </span>
          <h1 className="text-2xl font-extrabold text-[#222222]">
            관리자 시스템 로그인
          </h1>
        </div>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-2.5 text-xs font-bold text-red-700 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            관리자 이메일 주소 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="admin@muancivic.or.kr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            비밀번호 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#176B52] hover:bg-[#0D4938] text-white font-extrabold text-sm rounded-xl shadow hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>인증 처리 중...</span>
            </>
          ) : (
            <span>관리자 로그인</span>
          )}
        </button>
      </form>

      {/* Back to Public Website Link */}
      <div className="pt-4 border-t border-gray-100 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#176B52] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>일반 홈페이지로 돌아가기</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl">
        <Suspense fallback={
          <div className="py-12 text-center text-xs font-bold text-gray-500">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#176B52]" />
            로그인 화면을 구성하고 있습니다...
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
