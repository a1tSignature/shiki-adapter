export interface PlayerSource {
  number: number,
  link: string,
  source: string,
}

export interface PlayerSources {
  [episode: number]: PlayerSource[]
}
