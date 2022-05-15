import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { WebSearchUiModule } from '@my-app/web/search/ui';
import { SumPipeModule } from '@my-app/web/shared/utils';

@NgModule({
  imports: [
    CommonModule,
    WebSearchUiModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: SearchComponent}
    ]),
  ],
  declarations: [
    SearchComponent
  ],
  exports: [
    SearchComponent
  ],
})
export class WebSearchFeatureModule {}
