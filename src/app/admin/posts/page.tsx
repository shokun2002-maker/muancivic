"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAdminPosts, deletePost } from "@/lib/admin/posts";
import { Post } from "@/types/post";
import PostTable from "@/components/admin/PostTable";
import PostCardList from "@/components/admin/PostCardList";

const AdminPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getAdminPosts({
        type: typeFilter || undefined,
        status: statusFilter || undefined,
        search: searchQuery || undefined,
      });
      setPosts(data);
    } catch (e) {
      console.error(e);
      alert("게시글을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [typeFilter, statusFilter, searchQuery]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "정말 이 게시글을 삭제하시겠습니까?\\n삭제한 게시글은 복구할 수 없습니다."
    );
    if (!confirmed) return;
    try {
      await deletePost(id);
      alert("게시글이 삭제되었습니다.");
      fetchPosts();
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">게시글 관리</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <select
          className="border rounded px-2 py-1"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">전체 종류</option>
          <option value="activity">활동소식</option>
          <option value="notice">공지사항</option>
          <option value="statement">성명·논평</option>
        </select>

        <select
          className="border rounded px-2 py-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">전체 상태</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
        </select>

        <input
          type="text"
          placeholder="제목·카테고리 검색"
          className="border rounded px-2 py-1 flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Link
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
        >
          새 글 작성
        </Link>
      </div>

      {loading ? (
        <p>불러오는 중...</p>
      ) : isMobile ? (
        <PostCardList posts={posts} onDelete={handleDelete} />
      ) : (
        <PostTable posts={posts} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default AdminPostsPage;
