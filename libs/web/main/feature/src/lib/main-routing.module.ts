import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@my-app/web/login/guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@my-app/web/dashboard/feature').then(
            (module) => module.WebDashboardFeatureModule
          ),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('@my-app/web/invoice/feature').then(
            (module) => module.WebInvoiceFeatureModule
          ),
      },
      {
        path: 'income',
        loadChildren: () =>
          import('@my-app/web/income/feature').then(
            (module) => module.WebIncomeFeatureModule
          ),
      },
      {
        path: 'camera',
        loadChildren: () =>
          import('@my-app/web/camera/feature').then(
            (module) => module.WebCameraFeatureModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('@my-app/web/search/feature').then(
            (module) => module.WebSearchFeatureModule
          ),
      },
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full',
      // },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('@my-app/web/not-found/feature').then(
        (m) => m.WebNotFoundFeatureModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
