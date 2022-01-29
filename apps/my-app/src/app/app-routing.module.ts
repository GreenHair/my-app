import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivateChild: [AuthGuard],
        children: [
          {
            path: "dashboard",
            loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
          },
          { 
            path: 'add', 
            loadChildren: () => import('./components/add/add.module').then(m => m.AddModule) }
        ]
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
