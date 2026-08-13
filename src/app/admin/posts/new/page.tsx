"use client";

import PostForm from "@/components/admin/PostForm";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  return (
    <AdminAuthGuard>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>
        <PostForm
          onSuccess={() => {
            // after successful creation, navigate back to posts list
            router.push("/admin/posts");
          }}
        />
      </div>
    </AdminAuthGuard>
  );
}
