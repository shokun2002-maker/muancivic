"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase client not initialized");
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      if (resetError) throw resetError;
      setMessage(
        "비밀번호 재설정 메일을 보냈습니다.\n메일함에서 가장 최근에 받은 링크를 확인해주세요."
      );
    } catch (err) {
      console.error(err);
      setError("비밀번호 재설정 메일 발송 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F3] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl">
        <h1 className="text-2xl font-extrabold text-center mb-6">비밀번호 재설정 요청</h1>
        {message ? (
          <p className="text-center text-green-600 whitespace-pre-line mb-4">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                관리자 이메일 주소 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              />
            </div>
            {error && (
              <p className="text-center text-red-600 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#176B52] hover:bg-[#0D4938] text-white font-extrabold text-sm rounded-xl transition-colors disabled:opacity-70"
            >
              {loading ? "보내는 중..." : "비밀번호 재설정 메일 보내기"}
            </button>
          </form>
        )}
        <div className="pt-4 text-center">
          <a href="/admin/login" className="text-xs font-bold text-gray-500 hover:text-[#176B52] transition-colors">
            로그인 페이지로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
