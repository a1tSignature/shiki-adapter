export type TitleType = `tv` | `movie` | `ova` | `ona` | `special` | `music` | `tv_13` | `tv_24` | `tv_48`;

export type TitleStatus = `anons` | `ongoing` | `released`;

export interface TitleInfo {
  id: number;
  name: string;
  image: {
    original: string,
  };
  kind: TitleType;
  status: TitleStatus;
}

export interface TitleInfoSA {
  shikimoriId: number;
  name: string;
  originalImageLink: string,
  kind: TitleType;
  status: TitleStatus;
}

export const titleInfoConvertToSa = (from: TitleInfo): TitleInfoSA => ({
  shikimoriId: from.id,
  originalImageLink: from.image.original,

  ...from,
});

export const titleInfoSaConvertToShiki = (from: TitleInfoSA): TitleInfo => ({
  id: from.shikimoriId,
  image: {
    original: from.originalImageLink,
  },

  ...from,
});

