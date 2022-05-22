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

  episode?: TitleInfoEpisode;
}

export interface TitleInfoEpisode {

}
