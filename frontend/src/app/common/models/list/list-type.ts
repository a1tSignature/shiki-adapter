export enum ListType {
  PLANNED = `Запланировано`,
  WATCHING = `Смотрю`,
  WATCHED = `Просмотрено`,
  ABANDONED = `Брошено`,
  UPDATES = `Обновления`,
}

export enum ListTypeUpdatable {
  PLANNED = `Запланировано`,
  WATCHING = `Смотрю`,
  WATCHED = `Просмотрено`,
  ABANDONED = `Брошено`,
}

export const ListTag: Record<ListType, string> = {
  [ListType.PLANNED]: `planned`,
  [ListType.WATCHING]: `watching`,
  [ListType.WATCHED]: `viewed`,
  [ListType.ABANDONED]: `abandoned`,
  [ListType.UPDATES]: `updating`,
};

export const ListTagReverse: Record<string, ListType> = {
  planned: ListType.PLANNED,
  watching: ListType.WATCHING,
  viewed: ListType.WATCHED,
  abandoned: ListType.ABANDONED,
  updating: ListType.UPDATES,
};
