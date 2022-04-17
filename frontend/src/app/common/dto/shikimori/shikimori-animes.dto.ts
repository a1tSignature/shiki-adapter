interface ShikimoriAnime {
  id: number;
  name: string;
  image: {
    original: string,
  },
  status: `anons` | `ongoing` | `released`,
}

export interface ShikimoriAnimesDto extends Array<ShikimoriAnime> {}
