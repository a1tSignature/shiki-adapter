import { Data, Route } from "@angular/router";
import { AuthGuardData } from "#modules/routing/guards/auth.guard";
import { PrefetchGuardData } from "#modules/routing/guards/title-prefetch.guard";

export interface RouteData extends Data {
  auth?: AuthGuardData,
  titlePrefetch?: PrefetchGuardData,
}

export interface RouteWithData extends Route {
  data?: RouteData
}

export interface RoutesWithData extends Array<RouteWithData> {}
