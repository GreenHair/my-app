import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const webNotFoundFeatureRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: NotFoundComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(webNotFoundFeatureRoutes)],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
})
export class WebNotFoundFeatureModule {}
