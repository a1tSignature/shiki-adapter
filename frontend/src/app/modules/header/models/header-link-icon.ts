export type HeaderLinkIcon = `home`
  | `sign-in`
  | `sign-out`
  | `search`
  | `list`
  | `accounts`;

export const IconNameToIconSrc: Record<HeaderLinkIcon, string> = {
  "home": `assets/icons/home.svg`,
  "sign-in": `assets/icons/sign-in.svg`,
  "sign-out": `assets/icons/sign-out.svg`,
  "search": `assets/icons/search.svg`,
  "list": `assets/icons/list.svg`,
  "accounts": `assets/icons/accounts.svg`,
};
