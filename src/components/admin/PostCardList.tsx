import React from "react";
import Link from "next/link";
import { Post } from "@/types/post";

interface PostCardListProps {
  posts: Post[];
  onDelete: (id: string) => void;
}

const PostCardList: React.FC<PostCardListProps> = ({ posts, onDelete }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-600 mb-1">종류: {post.type}</p>
          <p className="text-sm text-gray-600 mb-1">카테고리: {post.category ?? "-"}</p>
          <p className="text-sm text-gray-600 mb-1">상태: {post.status}</p>
          <p className="text-sm text-gray-600 mb-1">공개일: {post.published_at ? new Date(post.published_at).toLocaleDateString() : "-"}</p>
          <p className="text-sm text-gray-600 mb-2">작성일: {new Date(post.created_at).toLocaleDateString()}</p>
          <div className="flex space-x-4">
            <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-600 hover:underline">수정</Link>
            <button type="button" onClick={() => onDelete(post.id)} className="text-red-600 hover:underline">삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCardList;
