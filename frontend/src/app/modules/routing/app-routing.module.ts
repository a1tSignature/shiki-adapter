import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from "../pages/components/main-page/main-page.component";
import { RoutesWithData, RouteWithData } from "#modules/routing/models/route-data";
import { RouteToRole } from "#modules/routing/models/route-to-role";
import { UserRole } from "#src/app/common/models/user/role/user-role";
import { AuthGuard } from "#modules/routing/guards/auth.guard";
import { SearchPageComponent } from "#modules/pages/components/search-page/search-page.component";
import { LoginPageComponent } from "#modules/pages/components/login-page/login-page.component";
import { LogoutPageComponent } from "#modules/pages/components/logout-page/logout-page.component";
import { TitlePrefetchGuard } from "#modules/routing/guards/title-prefetch.guard";
import { TitlePageComponent } from "#modules/pages/components/title-page/title-page.component";
import { FaqPageComponent } from "#modules/pages/components/faq-page/faq-page.component";
import { ShkeyPageComponent } from '../pages/components/shkey-page/shkey-page.component';
import { ListPageComponent } from "#modules/pages/components/list-page/list-page.component";
import { AdminLoginPageComponent } from "#modules/pages/components/admin-login-page/admin-login-page.component";
import { AdminPanelPageComponent } from "#modules/pages/components/admin-panel-page/admin-panel-page.component";

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
  route(`list`, ListPageComponent, RouteToRole.list),
  {
    path: `anime/:id`,
    component: TitlePageComponent,
    canActivate: [AuthGuard, TitlePrefetchGuard],
    data: {
      auth: {
        roles: RouteToRole.anime,
      },
    },
  },

  route(`accounts`, AdminPanelPageComponent, RouteToRole.accounts),
  route(`admin_login`, AdminLoginPageComponent, RouteToRole.login),
  route(`faq`, FaqPageComponent, RouteToRole.faq),
  route(`shkey`, ShkeyPageComponent, RouteToRole.shkey),
  route(`login`, LoginPageComponent, RouteToRole.login),
  route(`logout`, LogoutPageComponent, RouteToRole.logout),
  route(`search`, SearchPageComponent, RouteToRole.search),
  route(`home`, MainPageComponent, RouteToRole.home),
  { path: `**`, redirectTo: `home` },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: `reload` })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
