import { AdminRole } from "@/lib/permission";

export interface AdminProfileDbRow {
  id: string;
  auth_user_id: string;
  role: AdminRole;
  display_name: string;
  created_at: string;
  updated_at: string;
}
