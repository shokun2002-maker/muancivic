export enum AdminRole {
  super_admin = "super_admin",
  content_admin = "content_admin",
  operator = "operator",
  member_admin = "member_admin",
}

export const canManagePosts = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageIssues = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageMonitoring = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageResources = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageVoices = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageMedia = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageEvents = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.content_admin;
};

export const canManageMembers = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.member_admin;
};

export const canManageInquiries = (role: AdminRole): boolean => {
  return (
    role === AdminRole.super_admin ||
    role === AdminRole.operator ||
    role === AdminRole.member_admin
  );
};

export const canManageDonations = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin || role === AdminRole.operator;
};

export const canManageSettings = (role: AdminRole): boolean => {
  return role === AdminRole.super_admin;
};
