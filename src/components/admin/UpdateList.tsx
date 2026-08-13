// src/components/admin/UpdateList.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  getIssueUpdates,
  createIssueUpdate,
  updateIssueUpdate,
  deleteIssueUpdate,
} from "@/lib/admin/issue-details";

interface UpdateItem {
  id: string;
  event_date: string; // ISO date string (YYYY-MM-DD)
  title: string;
  sort_order: number;
}

export default function UpdateList({ issueId }: { issueId: string }) {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getIssueUpdates(issueId);
      setUpdates(data);
    } catch (e) {
      console.error(e);
      alert("진행 상황을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [issueId]);

  const handleAdd = async () => {
    const title = window.prompt("새 진행 상황(제목)을 입력하세요");
    if (!title) return;
    const date = window.prompt("날짜를 YYYY-MM-DD 형식으로 입력하세요");
    if (!date) return;
    try {
      await createIssueUpdate(issueId, date, title);
      await load();
    } catch (e) {
      console.error(e);
      alert("진행 상황 추가에 실패했습니다.");
    }
  };

  const handleEdit = async (item: UpdateItem) => {
    const title = window.prompt("제목을 수정하세요", item.title);
    if (title === null) return; // Cancel
    const date = window.prompt("날짜를 YYYY-MM-DD 형식으로 입력하세요", item.event_date);
    if (date === null) return;
    try {
      await updateIssueUpdate(item.id, { title, event_date: date });
      await load();
    } catch (e) {
      console.error(e);
      alert("진행 상황 수정에 실패했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("진행 상황을 삭제하시겠습니까?")) return;
    try {
      await deleteIssueUpdate(id);
      await load();
    } catch (e) {
      console.error(e);
      alert("진행 상황 삭제에 실패했습니다.");
    }
  };

  const move = async (id: string, direction: "up" | "down") => {
    const index = updates.findIndex((u) => u.id === id);
    if (index === -1) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updates.length) return;
    const target = updates[targetIdx];
    // swap sort_order values
    await Promise.all([
      updateIssueUpdate(id, { sort_order: target.sort_order }),
      updateIssueUpdate(target.id, { sort_order: updates[index].sort_order }),
    ]);
    await load();
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        진행 상황 (Timeline)
      </h2>
      {loading ? (
        <p>로드 중...</p>
      ) : (
        <div className="space-y-2">
          {updates.map((u) => (
            <div
              key={u.id}
              className="p-3 bg-[#F7F7F3] rounded flex items-center justify-between"
            >
              <span>{u.event_date} - {u.title}</span>
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => move(u.id, "up")}
                  className="text-xs text-gray-600"
                >▲</button>
                <button
                  type="button"
                  onClick={() => move(u.id, "down")}
                  className="text-xs text-gray-600"
                >▼</button>
                <button
                  type="button"
                  onClick={() => handleEdit(u)}
                  className="text-sm text-blue-600"
                >수정</button>
                <button
                  type="button"
                  onClick={() => handleDelete(u.id)}
                  className="text-sm text-red-600"
                >삭제</button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 bg-emerald-600 text-white px-3 py-1 rounded"
          >
            + 진행 상황 추가
          </button>
        </div>
      )}
    </div>
  );
}
