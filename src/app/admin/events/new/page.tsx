"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EventForm from "@/components/admin/EventForm";
import { createEvent, EventInputPayload } from "@/lib/admin/events";
import { getMyAdminProfile } from "@/lib/admin/settings";
import { canManageEvents } from "@/lib/permission";
import { Loader2, ShieldAlert } from "lucide-react";

export default function NewAdminEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);

  useEffect(() => {
    async function checkPerm() {
      try {
        const myProfile = await getMyAdminProfile();
        if (!myProfile || !canManageEvents(myProfile.role)) {
          setHasPermission(false);
        }
      } catch (e) {
        console.error(e);
        setHasPermission(false);
      } finally {
        setLoading(false);
      }
    }
    checkPerm();
  }, []);

  const handleSubmit = async (payload: EventInputPayload) => {
    await createEvent(payload);
    alert("새 행사가 등록되었습니다.");
    router.push("/admin/events");
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
        <p className="text-sm font-semibold text-gray-600">권한을 확인하고 있습니다...</p>
      </div>
    );
  }

  if (!hasPermission) {
    return (
      <div className="p-6 max-w-4xl mx-auto py-20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-gray-900">접근 권한이 없습니다</h2>
        <p className="text-sm text-gray-600">
          행사 등록은 super_admin 및 content_admin 전용 기능입니다.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <EventForm onSubmit={handleSubmit} isEditing={false} />
    </div>
  );
}
