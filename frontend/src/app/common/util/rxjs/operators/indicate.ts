import { finalize, Observable, Subject } from "rxjs";
import { prepare } from "#src/app/common/util/rxjs/operators/prepare";

/**
 * Emits `true` right after subscription and `false` when the source is completed
 *
 * @example
 *  indicate(loading$)
 * */
export const indicate =
  <T>
  (indicator: Subject<boolean>): (source: Observable<T>) => Observable<T> =>
    (source: Observable<T>): Observable<T> =>
      source.pipe(
        prepare(() => indicator.next(true)),
        finalize(() => indicator.next(false)),
      );
