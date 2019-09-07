import { TimerPage } from './../timer/timer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TimerPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timer-popover',
  templateUrl: 'timer-popover.html',
})
export class TimerPopoverPage {

  protected ORIGINAL_INTERVAL: number;
  protected ORIGINAL_BREAKTIME: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ORIGINAL_INTERVAL = navParams.get("interval");
    this.ORIGINAL_BREAKTIME = navParams.get("breaktime");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerPopoverPage');
  }

}
