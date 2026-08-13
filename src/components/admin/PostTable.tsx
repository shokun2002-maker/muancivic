import React from 'react';
import Link from 'next/link';
import { Post } from '@/types/post';

const statusColors: Record<string, string> = {
  draft: 'bg-gray-200 text-gray-800',
  published: 'bg-green-200 text-green-800',
  hidden: 'bg-yellow-200 text-yellow-800',
};

interface PostTableProps {
  posts: Post[];
  onDelete: (id: string) => void;
}

const PostTable: React.FC<PostTableProps> = ({ posts, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2">제목</th>
            <th className="px-4 py-2">종류</th>
            <th className="px-4 py-2">카테고리</th>
            <th className="px-4 py-2">상태</th>
            <th className="px-4 py-2">공개일</th>
            <th className="px-4 py-2">작성일</th>
            <th className="px-4 py-2 text-center">관리</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">{post.title}</td>
              <td className="px-4 py-2 capitalize">{post.type}</td>
              <td className="px-4 py-2">{post.category ?? '-'}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs ${statusColors[post.status]}`}
                >
                  {post.status}
                </span>
              </td>
              <td className="px-4 py-2">
                {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
              </td>
              <td className="px-4 py-2">
                {new Date(post.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-center space-x-2">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  수정
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete(post.id)}
                  className="text-red-600 hover:underline"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
