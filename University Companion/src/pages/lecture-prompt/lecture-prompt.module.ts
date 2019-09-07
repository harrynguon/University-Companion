import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LecturePromptPage } from './lecture-prompt';

@NgModule({
  declarations: [
    LecturePromptPage,
  ],
  imports: [
    IonicPageModule.forChild(LecturePromptPage),
  ],
})
export class LecturePromptPageModule {}
