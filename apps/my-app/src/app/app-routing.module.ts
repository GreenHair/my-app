import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@my-app/web/login/guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('@my-app/web/login/feature').then(
        (module) => module.WebLoginFeatureModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('@my-app/web/main/feature').then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('@my-app/web/main/feature').then(
        (m) => m.MainModule
      ),
      canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
