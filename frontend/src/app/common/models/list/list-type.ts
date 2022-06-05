export enum ListType {
  PLANNED = `Запланировано`,
  WATCHING = `Смотрю`,
  WATCHED = `Просмотрено`,
  ABANDONED = `Брошено`,
  UPDATES = `Обновления`,
}

export const ListTag: Record<ListType, string> = {
  [ListType.PLANNED]: `planned`,
  [ListType.WATCHING]: `watching`,
  [ListType.WATCHED]: `viewed`,
  [ListType.ABANDONED]: `abandoned`,
  [ListType.UPDATES]: `updating`,
};
