export enum AdminRole {
  super_admin = "super_admin",
  content_admin = "content_admin",
  operator = "operator",
  member_admin = "member_admin",
}

/**
 * Returns true if the given role is allowed to manage posts (create, edit, delete).
 * Currently only super_admin and content_admin have full access.
 */
export const canManagePosts = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

/**
 * Returns true if the given role is allowed to manage issues.
 * Allows super_admin and content_admin.
 */
export const canManageIssues = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageMonitoring = (role: AdminRole): boolean => {
  // Only super_admin and content_admin can manage monitoring posts
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageResources = (role: AdminRole): boolean => {
  // Only super_admin and content_admin can manage policy resources
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageVoices = (role: AdminRole): boolean => {
  // Only super_admin and content_admin can manage citizen voices
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageMedia = (role: AdminRole): boolean => {
  // Only super_admin and content_admin can manage media albums
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};
