import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseTimeManagerPage } from './course-time-manager';

@NgModule({
  declarations: [
    CourseTimeManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseTimeManagerPage),
  ],
})
export class CourseTimeManagerPageModule {}
