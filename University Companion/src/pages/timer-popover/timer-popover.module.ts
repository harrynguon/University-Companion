import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerPopoverPage } from './timer-popover';

@NgModule({
  declarations: [
    TimerPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(TimerPopoverPage),
  ],
})
export class TimerPopoverPageModule {}
