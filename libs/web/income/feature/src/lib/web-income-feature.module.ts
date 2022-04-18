import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncomeFeatureComponent } from './income-feature.component';
import { WebIncomeUiModule } from '@my-app/web/income/ui';
import { WebIncomeDataAccessModule } from '@my-app/web/income/data-access';

@NgModule({
  imports: [
    CommonModule,
    WebIncomeUiModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: IncomeFeatureComponent}
    ]),
    WebIncomeDataAccessModule
  ],
  declarations: [
    IncomeFeatureComponent
  ],
})
export class WebIncomeFeatureModule {}
