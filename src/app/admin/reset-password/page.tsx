"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [hasValidSession, setHasValidSession] = useState<boolean | null>(null);

  // Check if Supabase has a user session (recovery token)
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      if (!supabase) {
        setHasValidSession(false);
        return;
      }
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        setHasValidSession(false);
      } else {
        setHasValidSession(true);
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("입력한 비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase client not initialized");
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;
      setMessage("비밀번호가 변경되었습니다.");
      // Sign out to clear the recovery session
      await supabase.auth.signOut();
      router.push("/admin/login");
    } catch (err) {
      console.error(err);
      setError("비밀번호 변경 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (hasValidSession === false) {
    return (
      <div className="min-h-screen bg-[#F7F7F3] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl text-center">
          <p className="text-red-600 mb-4">비밀번호 재설정 링크가 만료되었거나 유효하지 않습니다.</p>
          <a href="/admin/forgot-password" className="text-sm font-bold text-[#176B52] hover:underline">
            새 재설정 메일 다시 받기
          </a>
        </div>
      </div>
    );
  }

  // While checking session, show loading placeholder
  if (hasValidSession === null) {
    return (
      <div className="min-h-screen bg-[#F7F7F3] flex items-center justify-center">
        <p className="text-gray-600">로드 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F3] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl">
        <h1 className="text-2xl font-extrabold text-center mb-6">새 비밀번호 설정</h1>
        {error && <p className="text-center text-red-600 mb-2">{error}</p>}
        {message && <p className="text-center text-green-600 mb-2">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">새 비밀번호 *</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-4 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">새 비밀번호 확인 *</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-4 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#176B52] hover:bg-[#0D4938] text-white font-extrabold text-sm rounded-xl transition-colors disabled:opacity-70"
          >
            {loading ? "저장 중..." : "새 비밀번호 설정"}
          </button>
        </form>
      </div>
    </div>
  );
}
