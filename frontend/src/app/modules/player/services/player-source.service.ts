import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { PlayerSource } from "#models/player/player-source";
import { Maybe } from "#types/maybe";

@Injectable({
  providedIn: `root`,
})
export class PlayerSourceService {
  public source$: Observable<Maybe<PlayerSource>>;
  public options$: Observable<PlayerSource[]>;
  private source = new BehaviorSubject<Maybe<PlayerSource>>(null);
  private options = new BehaviorSubject<PlayerSource[]>([]);

  constructor() {
    this.source$ = this.source.asObservable();
    this.options$ = this.options.asObservable();
  }

  setSrc(src: PlayerSource): void {
    this.source.next(src);
  }


}
