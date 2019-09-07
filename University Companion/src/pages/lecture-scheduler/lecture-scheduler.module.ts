import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LectureSchedulerPage } from './lecture-scheduler';

@NgModule({
  declarations: [
    LectureSchedulerPage,
  ],
  imports: [
    IonicPageModule.forChild(LectureSchedulerPage),
  ],
})
export class LectureSchedulerPageModule {}
