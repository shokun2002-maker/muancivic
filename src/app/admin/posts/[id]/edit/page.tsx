"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostForm from "@/components/admin/PostForm";
import { getAdminPostById } from "@/lib/admin/posts";
import { Post } from "@/types/post";

export default function EditPostPage() {
  const { id } = useParams() as { id: string };

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") {
      setError("잘못된 게시글 주소입니다.");
      setLoading(false);
      return;
    }

    async function loadPost() {
      try {
        setLoading(true);
        const data = await getAdminPostById(id);
        if (!data) {
          setError("게시글을 찾을 수 없습니다.");
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error("Edit post load error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === "object" && err !== null && "message" in err) {
          setError(String((err as { message?: unknown }).message));
        } else {
          setError("게시글을 불러오는 중 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  if (loading) {
    return <p className="p-4">게시글 정보를 불러오는 중입니다.</p>;
  }

  if (error) {
    return <p className="p-4 text-red-600">{error}</p>;
  }

  if (!post) {
    return <p className="p-4 text-red-600">게시글을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>
      <PostForm
        mode="edit"
        postId={post.id}
        initialData={post}
        onSuccess={() => {
          // PostForm handles navigation after save
        }}
      />
    </div>
  );
}
