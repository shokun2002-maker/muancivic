"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EventForm from "@/components/admin/EventForm";
import { getAdminEventById, updateEvent, EventInputPayload } from "@/lib/admin/events";
import { EventDbRow } from "@/types/event";
import { getMyAdminProfile } from "@/lib/admin/settings";
import { canManageEvents } from "@/lib/permission";
import { Loader2, ShieldAlert } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditAdminEventPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [eventData, setEventData] = useState<EventDbRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const myProfile = await getMyAdminProfile();
        if (!myProfile || !canManageEvents(myProfile.role)) {
          setHasPermission(false);
          setLoading(false);
          return;
        }

        const data = await getAdminEventById(id);
        if (!data) {
          alert("존재하지 않는 행사입니다.");
          router.push("/admin/events");
          return;
        }
        setEventData(data);
      } catch (e) {
        console.error(e);
        alert("행사 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [id, router]);

  const handleSubmit = async (payload: EventInputPayload) => {
    await updateEvent(id, payload);
    alert("행사 정보가 수정되었습니다.");
    router.push("/admin/events");
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#176B52] animate-spin mb-2" />
        <p className="text-sm font-semibold text-gray-600">행사 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!hasPermission) {
    return (
      <div className="p-6 max-w-4xl mx-auto py-20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-gray-900">접근 권한이 없습니다</h2>
        <p className="text-sm text-gray-600">
          행사 수정은 super_admin 및 content_admin 전용 기능입니다.
        </p>
      </div>
    );
  }

  if (!eventData) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <EventForm initialData={eventData} onSubmit={handleSubmit} isEditing={true} />
    </div>
  );
}
