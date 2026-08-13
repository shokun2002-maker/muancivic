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
