import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera/camera.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: CameraComponent}
     ]),
     NgbModule,
     ReactiveFormsModule,
  ],
  declarations: [
    CameraComponent
  ],
  exports: [
    CameraComponent
  ],
})
export class WebCameraFeatureModule {}
