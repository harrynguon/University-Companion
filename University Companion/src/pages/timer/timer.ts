import { TimerPopoverPage } from './../timer-popover/timer-popover';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { startTimeRange } from '../../../node_modules/@angular/core/src/profile/wtf_impl';
import { PopoverController } from 'ionic-angular';

/**
 * Generated class for the TimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  protected ORIGINAL_INTERVAL: number;
  protected ORIGINAL_BREAKTIME: number;

  protected hideStartBtn: boolean;
  protected breakPeriod: boolean;
  protected pauseResumeButton: string;
  protected hasStarted: boolean;
  protected time: number;
  protected timeString: string;
  protected breakTime: number;
  private intervalFunc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    protected dataProvider: DataProvider, protected popoverCtrl : PopoverController,
    private alertCtrl : AlertController) {
    this.hideStartBtn = false;
    this.breakPeriod = false;
    this.pauseResumeButton = "Pause";
    this.hasStarted = false;

    this.ORIGINAL_INTERVAL = dataProvider.getTimerInterval();
    this.breakTime = this.ORIGINAL_INTERVAL / 5;
    this.time = this.ORIGINAL_INTERVAL;
    this.ORIGINAL_BREAKTIME = this.breakTime;

    this.updateTimeString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerPage');
  }

  protected startTimer() {
    this.hideStartBtn = true;
    this.intervalFunc = setInterval(() => {
      this.time = (this.time - 1);
      this.updateTimeString();
      if (this.time == 0) {
        this.breakPeriod = true;
        clearInterval(this.intervalFunc);
        this.updateTimeString();
        this.startBreakPeriod();
      }
    }, 1000);
    this.hasStarted = true;
  }

  private startBreakPeriod() {
    if (this.breakPeriod) {
      this.time = this.ORIGINAL_BREAKTIME;
      this.hideStartBtn = true;
      this.pauseResumeButton = "Pause";
      this.intervalFunc = setInterval(() => {
        this.time = (this.time - 1);
        this.updateTimeString();
        if (this.time == 0) {
          this.breakPeriod = false;
          clearInterval(this.intervalFunc);
          this.time = this.ORIGINAL_INTERVAL;
          this.updateTimeString();
          this.startTimer();
        }
      }, 1000);
    }
  }

  private updateTimeString() {
    var minutes = Math.floor(this.time / 60);
    var seconds = this.time % 60;
    this.timeString = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  }

  protected toggleTimer() {
    if (this.hasStarted) {
      this.hasStarted = !this.hasStarted;
      clearInterval(this.intervalFunc);
      this.pauseResumeButton = "Resume";
    } else {
      if (!this.breakPeriod) {
        this.startTimer();
      } else {
        this.startBreakPeriod();
      }
      this.pauseResumeButton = "Pause";
    }
    this.updateTimeString();
  }

  protected resetTimer() {
    this.hideStartBtn = false;
    this.hasStarted = false;
    this.pauseResumeButton = "Pause";
    clearInterval(this.intervalFunc);
    this.time = this.ORIGINAL_INTERVAL;
    this.updateTimeString();
  }

  protected breakOrStudy() {
    return this.breakPeriod ? "Break" : "Study";
  }

  protected presentPopover(myEvent) {
    // let popover = this.popoverCtrl.create(TimerPopoverPage,
    //   {
    //     "interval": this.ORIGINAL_INTERVAL,
    //     "breaktime": this.ORIGINAL_BREAKTIME
    //   });
    // popover.present({
    //   ev: myEvent
    // });
    let alert = this.alertCtrl.create({
      title: 'Timer Information',
      subTitle: 'Interval: ' + this.ORIGINAL_INTERVAL + ' seconds<br>' +
                'Break Period: ' + this.ORIGINAL_BREAKTIME + ' seconds<br>' +
                '<br>The timer can be adjusted in the settings.',
      buttons: ['Okay']
    });
    alert.present();
  }
}