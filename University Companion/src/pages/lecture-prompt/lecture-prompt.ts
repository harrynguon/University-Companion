import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the LecturePromptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lecture-prompt',
  templateUrl: 'lecture-prompt.html',
})
export class LecturePromptPage {

  protected isAddLecture : boolean;
  protected courseName : string;
  protected room : string;
  protected startTime : string;
  protected endTime : string;

  protected repeat : boolean;
  protected repeatFinish : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewController : ViewController) {
    this.isAddLecture = navParams.get("isAddLecture");
    this.courseName = navParams.get("courseName");
    this.room = navParams.get("room");
    this.startTime = navParams.get("startTime");
    this.endTime = navParams.get("endTime");
    this.repeat = false;
    this.repeatFinish = navParams.get("startTime");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LecturePromptPage');
  }

  dismiss() {
    this.viewController.dismiss();
  }

  addOrModify() {
    return this.isAddLecture ? "Add" : "Modify"
  }

  addLecture() {
    let startDateString = new Date(this.startTime);
    let startDate = new Date(startDateString.getTime() + startDateString.getTimezoneOffset()*60000);
    let endDateString = new Date(this.endTime);
    let endDate = new Date(endDateString.getTime() + endDateString.getTimezoneOffset()*60000);
    let repeatFinishString = new Date(this.repeatFinish);
    let repeatEndDate = new Date(repeatFinishString.getTime() + repeatFinishString.getTimezoneOffset()*60000);
    this.viewController.dismiss({
      courseName : this.courseName,
      room : this.room,
      startTime : startDate,
      endTime : endDate,
      repeatEnd : repeatEndDate
    });
  }

  modifyLecture() {
    let startDateString = new Date(this.startTime);
    let startDate = new Date(startDateString.getTime() + startDateString.getTimezoneOffset()*60000);
    let endDateString = new Date(this.endTime);
    let endDate = new Date(endDateString.getTime() + endDateString.getTimezoneOffset()*60000);
    this.viewController.dismiss({
      courseName : this.courseName,
      room : this.room,
      startTime : startDate,
      endTime : endDate
    });
  }

}
