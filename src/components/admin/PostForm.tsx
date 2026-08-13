"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost, checkSlugExists } from "@/lib/admin/posts";
import { generateSlug } from "@/lib/slug";
import { canManagePosts } from "@/lib/permission";
import { useAdmin } from "@/components/admin/AdminAuthGuard";
import { Post } from "../../types/post";

interface PostInput {
  type: "activity" | "notice" | "statement";
  title: string;
  slug: string;
  summary?: string;
  content: string;
  category?: string;
  thumbnail_url?: string;
  status: "draft" | "published" | "hidden";
  published_at?: string | null;
}

export default function PostForm({
  onSuccess,
  mode = "create",
  postId,
  initialData,
}: {
  onSuccess?: () => void;
  mode?: "create" | "edit";
  postId?: string;
  initialData?: Post;
}) {
  const router = useRouter();
  const { adminProfile } = useAdmin();
  const role = adminProfile?.role ?? "";
  const canWrite = canManagePosts(role as any);

  const [form, setForm] = useState<PostInput>(initialData ? {
    type: initialData.type,
    title: initialData.title,
    slug: initialData.slug,
    summary: initialData.summary ?? "",
    content: initialData.content,
    category: initialData.category ?? "",
    thumbnail_url: initialData.thumbnail_url ?? "",
    status: initialData.status,
    published_at: initialData.published_at ?? null,
  } : {
    type: "activity",
    title: "",
    slug: "",
    summary: "",
    content: "",
    category: "",
    thumbnail_url: "",
    status: "draft",
    published_at: null,
  });

  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // 자동 slug 생성 (사용자가 수동 편집하면 중단)
  useEffect(() => {
    // 편집 모드에서는 기존 slug를 유지
    if (mode === "edit") return;
    if (!isSlugEdited && form.title.trim()) {
      setForm((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [form.title, isSlugEdited, mode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "slug") setIsSlugEdited(true);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.type) newErrors.type = "콘텐츠 종류를 선택해주세요.";
    if (!form.title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!form.slug.trim()) newErrors.slug = "주소(slug)를 입력해주세요.";
    if (!form.content.trim()) newErrors.content = "본문을 입력해주세요.";
    if (!form.status) newErrors.status = "상태를 선택해주세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canWrite) {
      alert("게시글을 작성할 권한이 없습니다.");
      return;
    }
    if (!validate()) return;

    const payload = { ...form } as any;
    if (payload.status === "published" && !payload.published_at) {
      payload.published_at = new Date().toISOString();
    } else if (payload.status !== "published") {
      payload.published_at = null;
    }

    // slug duplicate check, exclude current id when editing
    const exists = await checkSlugExists(payload.slug, mode === "edit" ? postId : undefined);
    if (exists) {
      setErrors((prev) => ({ ...prev, slug: "이미 사용 중인 주소입니다." }));
      return;
    }

    setIsSaving(true);
    try {
      if (mode === "edit" && postId) {
        await updatePost(postId, payload);
      } else {
        await createPost(payload);
      }
      if (onSuccess) onSuccess();
      router.push("/admin/posts");
    } catch (err) {
      console.error(err);
      alert("게시글 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!canWrite) {
    return <p className="text-red-600">게시글을 작성할 권한이 없습니다.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 콘텐츠 종류 */}
      <div>
        <label className="block font-medium">콘텐츠 종류 *</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="activity">활동소식</option>
          <option value="notice">공지사항</option>
          <option value="statement">성명·논평</option>
        </select>
        {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
      </div>

      {/* 제목 */}
      <div>
        <label className="block font-medium">제목 *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      {/* slug */}
      <div>
        <label className="block font-medium">주소 (slug) *</label>
        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
      </div>

      {/* 요약 */}
      <div>
        <label className="block font-medium">요약</label>
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 본문 */}
      <div>
        <label className="block font-medium">본문 *</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={8}
          className="w-full border rounded p-2"
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content}</p>
        )}
      </div>

      {/* 카테고리 */}
      <div>
        <label className="block font-medium">카테고리</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 대표 이미지 URL */}
      <div>
        <label className="block font-medium">대표 이미지 URL</label>
        <input
          type="text"
          name="thumbnail_url"
          value={form.thumbnail_url}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 상태 */}
      <div>
        <label className="block font-medium">상태 *</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
        </select>
        {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
      </div>

      {/* 발행일 (published_at) */}
      {form.status === "published" && (
        <div>
          <label className="block font-medium">발행일</label>
          <input
            type="datetime-local"
            name="published_at"
            value={form.published_at ? form.published_at.slice(0, 16) : ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSaving}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isSaving ? "저장 중..." : mode === "edit" ? "수정하기" : "작성하기"}
      </button>
    </form>
  );
}
