import { defer, Observable } from "rxjs";

/**
 * Invokes a callback right after subscription
 * */
export const prepare =
  <T>
  (callback: () => void) =>
    (source: Observable<T>): Observable<T> =>
      defer(() => {
        callback();
        return source;
      });
