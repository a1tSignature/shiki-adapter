import { map, Observable, pipe } from "rxjs";
import { TitleInfo } from "#models/title/title-info";
import { SHIKIMORI_URL } from "#src/app/common/constants/constants";

/**
 * Reveals
 * */
export const formatTitleListParams =
  (): (source: Observable<TitleInfo[]>) => Observable<TitleInfo[]> =>
    pipe(
      map((titles: TitleInfo[]) => titles.map((item) => {
        Object.entries(item.image).map(([key, value]) => {
          item.image[key as keyof typeof item.image] = SHIKIMORI_URL + value;
        });

        return item;
      })),
    );
