import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from "../pages/components/main-page/main-page.component";
import { RoutesWithData, RouteWithData } from "#modules/routing/models/route-data";
import { RouteToRole } from "#modules/routing/models/route-to-role";
import { UserRole } from "#src/app/common/models/user/role/user-role";
import { AuthGuard } from "#src/app/modules/routing/guards/auth/auth.guard";
import { NotFoundComponent } from "#modules/pages/components/not-found/not-found.component";
import { SearchPageComponent } from "#modules/pages/components/search-page/search-page.component";
import { LoginPageComponent } from "#modules/pages/components/login-page/login-page.component";
import { LogoutPageComponent } from "#modules/pages/components/logout-page/logout-page.component";
import { TitlePrefetchGuard } from "#modules/routing/guards/prefetch/title-prefetch-guard.service";

const route = (path: string, component: Type<any>, roles: Array<UserRole>, children?: RouteWithData[]): RouteWithData => ({
  path,
  component,
  children,
  canActivate: [AuthGuard],
  data: {
    auth: {
      roles,
    },
  },
});

const routes: RoutesWithData = [
  // todo replace with pages components
  route(`faq`, NotFoundComponent, RouteToRole.faq),
  route(`list`, NotFoundComponent, RouteToRole.list),

  {
    path: `anime/:id`,
    component: NotFoundComponent,
    canActivate: [AuthGuard, TitlePrefetchGuard],
    data: {
      auth: {
        roles: RouteToRole.anime,
      },
    },
  },

  route(`login`, LoginPageComponent, RouteToRole.login),
  route(`logout`, LogoutPageComponent, RouteToRole.logout),
  route(`search`, SearchPageComponent, RouteToRole.search),
  route(`home`, MainPageComponent, RouteToRole.home),
  { path: `**`, redirectTo: `home` },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
