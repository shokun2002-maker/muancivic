// src/components/admin/IssueForm.tsx

"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { Issue } from "@/types/issue";
import { generateSlug } from "@/lib/slug";

interface IssueFormProps {
  /** When editing, provide the existing issue data */
  initialData?: Issue;
  /** Callback to handle submission. Should create or update the issue. */
  onSubmit: (payload: Omit<Issue, "id" | "created_at" | "updated_at">) => Promise<void>;
  /** Optional cancel handler (e.g., navigate back) */
  onCancel?: () => void;
}

export default function IssueForm({ initialData, onSubmit, onCancel }: IssueFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [status, setStatus] = useState(initialData?.status ?? "draft");
  const [summary, setSummary] = useState(initialData?.summary ?? "");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail_url ?? "");
  const [publishedAt, setPublishedAt] = useState(
    initialData?.published_at ? initialData.published_at.slice(0, 10) : ""
  );

  // Auto‑generate slug from title on create mode
  useEffect(() => {
    if (!initialData && title) {
      setSlug(generateSlug(title));
    }
  }, [title, initialData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      status,
      summary: summary.trim(),
      thumbnail_url: thumbnail.trim() || undefined,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : undefined,
    } as Omit<Issue, "id" | "created_at" | "updated_at">;

    try {
      await onSubmit(payload);
    } catch (err) {
      console.error(err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div>
        <label className="block font-medium mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
          disabled={!!initialData} // prevent changing slug on edit
        />
      </div>

      <div>
        <label className="block font-medium mb-1">카테고리</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">상태</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
          <option value="대응 중">대응 중</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">요약</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          rows={3}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">썸네일 URL (선택)</label>
        <input
          type="url"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">공개일 (선택)</label>
        <input
          type="date"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          저장
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}
