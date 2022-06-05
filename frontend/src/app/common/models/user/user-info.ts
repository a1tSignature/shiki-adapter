import { UserRole } from "#src/app/common/models/user/role/user-role";

export interface UserInfo {
  userRole: UserRole,
}

export const DefaultUserInfo: UserInfo = {
  userRole: UserRole.GUEST,
};

interface TitleEpisode {
  link: string,
  episode: number,
  source: string,
}

interface TitleSeries extends Array<TitleEpisode> {

}
