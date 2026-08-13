// src/components/admin/PrincipleList.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  getIssuePrinciples,
  createIssuePrinciple,
  updateIssuePrinciple,
  deleteIssuePrinciple,
} from "@/lib/admin/issue-details";

interface Principle {
  id: string;
  content: string;
  sort_order: number;
}

export default function PrincipleList({ issueId }: { issueId: string }) {
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getIssuePrinciples(issueId);
      setPrinciples(data);
    } catch (e) {
      console.error(e);
      alert("핵심 원칙을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [issueId]);

  const handleAdd = async () => {
    const content = window.prompt("새 원칙을 입력하세요");
    if (!content) return;
    try {
      await createIssuePrinciple(issueId, content);
      await load();
    } catch (e) {
      console.error(e);
      alert("원칙 추가에 실패했습니다.");
    }
  };

  const handleEdit = async (p: Principle) => {
    const content = window.prompt("원칙을 수정하세요", p.content);
    if (content === null) return; // cancel
    try {
      await updateIssuePrinciple(p.id, { content });
      await load();
    } catch (e) {
      console.error(e);
      alert("원칙 수정에 실패했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("원칙을 삭제하시겠습니까?")) return;
    try {
      await deleteIssuePrinciple(id);
      await load();
    } catch (e) {
      console.error(e);
      alert("원칙 삭제에 실패했습니다.");
    }
  };

  const move = async (id: string, direction: "up" | "down") => {
    const index = principles.findIndex((p) => p.id === id);
    if (index === -1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= principles.length) return;
    const target = principles[targetIndex];
    // swap sort_order
    await Promise.all([
      updateIssuePrinciple(id, { sort_order: target.sort_order }),
      updateIssuePrinciple(target.id, { sort_order: principles[index].sort_order }),
    ]);
    await load();
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        핵심 원칙
      </h2>
      {loading ? (
        <p>로드 중...</p>
      ) : (
        <div className="space-y-2">
          {principles.map((p) => (
            <div
              key={p.id}
              className="p-3 bg-[#F7F7F3] rounded flex items-center justify-between"
            >
              <span>{p.content}</span>
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => move(p.id, "up")}
                  className="text-xs text-gray-600"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => move(p.id, "down")}
                  className="text-xs text-gray-600"
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit(p)}
                  className="text-sm text-blue-600"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="text-sm text-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 bg-emerald-600 text-white px-3 py-1 rounded"
          >
            + 원칙 추가
          </button>
        </div>
      )}
    </div>
  );
}
