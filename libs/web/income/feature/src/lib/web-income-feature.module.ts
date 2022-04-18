import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncomeFeatureComponent } from './income-feature.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: IncomeFeatureComponent}
    ]),
  ],
  declarations: [
    IncomeFeatureComponent
  ],
})
export class WebIncomeFeatureModule {}
