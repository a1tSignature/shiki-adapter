import { UserRole } from "#src/app/common/models/user/role/user-role";
import { TypescriptUtils } from "#types/typescript-utils";

const authorized = [
  UserRole.USER,
  UserRole.MODERATOR,
  UserRole.ADMIN,
];

const any = [
  UserRole.GUEST,
  ...authorized,
];

export const RouteToRole = TypescriptUtils.inferRecord({
  shkey: [...any],
  home: [...any],
  search: [...any],
  list: [...authorized],
  login: [
    UserRole.GUEST,
  ],
  logout: [...authorized],
  faq: [...any],
  anime: [...any],
  notFound: [...any],
});
