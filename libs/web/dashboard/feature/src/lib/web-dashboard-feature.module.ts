import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SumPipe, SumPipeModule } from '@my-app/web/shared/utils';
import { WebSharedUiModule } from '@my-app/web/shared/ui';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DashboardComponent}
    ]),
    SumPipeModule,
    WebSharedUiModule
  ],
  providers: [SumPipe]
})
export class WebDashboardFeatureModule {}
