import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncomeFeatureComponent } from './income-feature.component';
import { WebIncomeUiModule } from '@my-app/web/income/ui';
import { WebIncomeDataAccessModule } from '@my-app/web/income/data-access';
import { WebSharedUiModule } from '@my-app/web/shared/ui';

@NgModule({
  imports: [
    CommonModule,
    WebIncomeUiModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: IncomeFeatureComponent}
    ]),
    WebIncomeDataAccessModule,
    WebSharedUiModule,
  ],
  declarations: [
    IncomeFeatureComponent
  ],
})
export class WebIncomeFeatureModule {}
