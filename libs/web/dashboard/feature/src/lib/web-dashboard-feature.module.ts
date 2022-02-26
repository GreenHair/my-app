import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DashboardComponent}
    ]),
  ],
})
export class WebDashboardFeatureModule {}
