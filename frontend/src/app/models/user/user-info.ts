import { UserRole } from "#models/user/role/user-role";

export interface UserInfo {
  userRole: UserRole,
}

export const DefaultUserInfo: UserInfo = {
  userRole: UserRole.GUEST,
};
