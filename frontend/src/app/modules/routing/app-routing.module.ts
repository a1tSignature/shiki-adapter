import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from "../pages/components/main-page/main-page.component";
import { RoutesWithData, RouteWithData } from "#modules/routing/models/route-data";
import { RouteToRole } from "#modules/routing/models/route-to-role";
import { UserRole } from "#models/user/role/user-role";
import { AuthGuard } from "#src/app/guards/auth/auth.guard";

const route = (path: string, component: Type<any>, roles: Array<UserRole>): RouteWithData => ({
  path,
  component,
  canActivate: [AuthGuard],
  data: {
    roles,
  },
});

const routes: RoutesWithData = [
  // todo replace with pages components
  route(`login`, MainPageComponent, RouteToRole.login),
  route(`logout`, MainPageComponent, RouteToRole.logout),
  route(`search`, MainPageComponent, RouteToRole.search),
  route(`list`, MainPageComponent, RouteToRole.list),

  route(`home`, MainPageComponent, RouteToRole.home),
  { path: `**`, redirectTo: `home` },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
