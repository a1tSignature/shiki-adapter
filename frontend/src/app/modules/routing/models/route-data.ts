import { Data, Route } from "@angular/router";
import { UserRole } from "#models/user/role/user-role";

/**
 * undefined => any role
 *
 * array => only these roles
 * */

export interface RouteData extends Data {
  roles?: Array<UserRole>
}

export interface RouteWithData extends Route {
  data?: RouteData
}

export interface RoutesWithData extends Array<RouteWithData> {}
