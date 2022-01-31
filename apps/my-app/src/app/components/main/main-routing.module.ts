import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivateChild: [AuthGuard],
    children: [      
      {
        path: "dashboard",
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { 
        path: 'add',
        loadChildren: () => import('../add/add.module').then(m => m.AddModule)
      },
      {
        path: '',
        redirectTo: 'Dashboard',
        pathMatch: 'full'
      }      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
