import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@my-app/web/login/guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@my-app/web/main/feature').then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@my-app/web/login/feature').then(
        (module) => module.WebLoginFeatureModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
