import { LecturePromptPage } from './../lecture-prompt/lecture-prompt';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataProvider } from './../../providers/data/data';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { Time } from '../../../node_modules/@angular/common';
import { Singleton } from '../../CustomClass/Singleton';

/**
 * Generated class for the LectureSchedulerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lecture-scheduler',
  templateUrl: 'lecture-scheduler.html',
})

/**
 * Course Timetable Page.
 */
export class LectureSchedulerPage {

  protected today : Date;
  protected todayISOString : string;
  protected lectureData: { time: string, singleton: Singleton }[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private toasty : ToastController, private angularFireAuth : AngularFireAuth,
    private angularFireStore : AngularFirestore, private dataProvider : DataProvider,
    private modalController : ModalController) {
    this.today = new Date();
    // Let the ISO String show the time including that includes the locale timezone
    this.todayISOString = new Date(this.today.getTime() - this.today.getTimezoneOffset()*60000).toISOString();
    var todayPlusOneHr = new Date();
    todayPlusOneHr.setHours(todayPlusOneHr.getHours() + 1);
    this.lectureData = this.dataProvider.getLectureData();
    if (this.lectureData.length == 0) {
      this.lectureData = [
        {
          "time": this.getTimeAMPM(this.today),
          "singleton": new Singleton("Welcome! Swipe a lecture left or right to modify or delete it.",
              this.today, todayPlusOneHr, "ExampleRoom"),
        }
      ]
      this.updateLectures();
    }
    this.sortLectures();    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LectureSchedulerPage');
  }

  protected checkIfToday(singletonGroup : {time : string, singleton : Singleton} ) {
    var startDate = singletonGroup["singleton"].getStartTime();
    if ( startDate.getFullYear() ===  this.today.getFullYear()
      && startDate.getMonth()    ===  this.today.getMonth()
      && startDate.getDate()     ===  this.today.getDate()) {
        return true;
      }
    return false;
  }

  public getTimeAMPM(date : Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(" ", "");
  }

  promptAddLecture() {
    // let alert = this.alertCtrl.create({
    //   title: 'Add a Lecture',
    //   subTitle: 'Enter the details below to add a new lecture to your timetable',
    //   inputs: [
    //     {
    //       type: 'text',
    //       name: 'courseName',
    //       placeholder: 'Course Name'
    //     },
    //     {
    //       type: 'text',
    //       name: 'room',
    //       placeholder: 'Room',
    //     },
    //     {
    //       type: 'datetime-local',
    //       name: 'startTime',
    //       value: this.todayISOString.slice(0, -8),
    //       placeholder: 'Date and Time'
    //     },
    //     {
    //       type: 'datetime-local',
    //       name: 'finishTime',
    //       value: new Date(new Date(this.today.getTime()).setHours(this.today.getHours() + 1)
    //             - this.today.getTimezoneOffset() * 60000).toISOString().slice(0, -8),
    //       placeholder: 'Date and Time'
    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: data => { }
    //     },
    //     {
    //       text: 'Add',
    //       handler: data => {
    //         // console.log(data["time"] instanceof Date && !isNaN(data["time"].valueOf()));
    //         if(!isNaN(new Date(data["startTime"]).valueOf())
    //             && !isNaN(new Date(data["finishTime"]).valueOf())) {
    //           this.addLecture(data);
    //         }
    //         this.sortLectures();
    //       }
    //     }
    //   ]
    // });
    // alert.present();

    var todayPlusOneHr = new Date(this.today.getTime() - this.today.getTimezoneOffset()*60000);
    todayPlusOneHr.setHours(todayPlusOneHr.getHours() + 1);

    let lectureModal = this.modalController.create(LecturePromptPage, {
      isAddLecture: true,
      courseName: "",
      room: "",
      startTime: this.todayISOString,
      endTime: todayPlusOneHr.toISOString()
    });
    lectureModal.onDidDismiss(data => {
      if (typeof data !== 'undefined') {
        this.addLecture(data);
      }
    })
    lectureModal.present();
  }

  protected addLecture(data) {
    var date = new Date(data["startTime"]);
    var dateEnd = new Date(data["endTime"]);
    var repeat = new Date(data["repeatEnd"]);

    while (date.getTime() <= repeat.getTime()) {
      this.lectureData.push({
        "time": this.getTimeAMPM(date), // Header
        "singleton": new Singleton(
          data["courseName"],
          new Date(date),
          new Date(dateEnd),
          data["room"])
      });
      date = new Date(date.setDate(date.getDate()+7));
      dateEnd = new Date(dateEnd.setDate(dateEnd.getDate()+7));
    }
    this.toasty.create({
      message : "Your lecture for " + data["courseName"] + " has been added to your timetable!",
      duration : 2500
    }).present();

    this.updateLectures();
  }

  private updateLectures() {
    this.angularFireStore
      .collection('users')
      .doc(this.angularFireAuth.auth.currentUser.uid)
      .update({
        data : this.convertToObj(this.lectureData)
      });
  }

  private convertToObj(lectureData : { time: string, singleton: Singleton }[]) {
    return lectureData.map(lecture => ({
      time: lecture["time"],
      singleton: {
        name: lecture["singleton"]["name"],
        startTime: lecture["singleton"]["startTime"].toLocaleString(),
        endTime: lecture["singleton"]["endTime"].toLocaleString(),
        room: lecture["singleton"]["room"]
      }
    }));
  }

  protected updateDate() {
    let date = new Date(this.todayISOString);
    this.today = new Date(date.getTime() + date.getTimezoneOffset()*60000);
  }

  deleteConfirmation(self: Singleton) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete this lecture?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.removeSelf(self);
          }
        }
      ]
    });
    alert.present();
  }

  protected removeSelf(self: Singleton) {
    // Removes the whole object that contains the singleton
    this.lectureData = this.lectureData.filter(s => s["singleton"] !== self);
    this.toasty.create({
      message : "Your " + self.getName() + " lecture has been deleted!",
      duration : 2500
    }).present();
    this.updateLectures();
  }

  protected editSelf(self: Singleton) {
    // // Create an alert to modify the lecture
    // let alert = this.alertCtrl.create({
    //   title: 'Modify this lecture',
    //   subTitle: 'Enter the details below to amodify this lecture',
    //   inputs: [
    //     {
    //       type: 'text',
    //       name: 'courseName',
    //       value: self.getName()
    //     },
    //     {
    //       type: 'text',
    //       name: 'room',
    //       value: self.getRoom()
    //     },
    //     {
    //       type: 'datetime-local',
    //       name: 'startTime',
    //       value: new Date(self.getStartTime().getTime() - self.getStartTime().getTimezoneOffset() * 60000)
    //           .toISOString()
    //           .slice(0, -8)
    //     },
    //     {
    //       type: 'datetime-local',
    //       name: 'finishTime',
    //       value: new Date(self.getEndTime().getTime() - self.getEndTime().getTimezoneOffset() * 60000)
    //           .toISOString()
    //           .slice(0, -8)
    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: data => { }
    //     },
    //     {
    //       text: 'Add',
    //       handler: data => {
    //         if(!isNaN(new Date(data["startTime"]).valueOf())
    //             && !isNaN(new Date(data["finishTime"]).valueOf())) {
    //           this.modifyLecture(self, data);
              
    //         }
    //         this.sortLectures();
    //       }
    //     }
    //   ]
    // });
    // alert.present();

    let lectureModal = this.modalController.create(LecturePromptPage, {
      isAddLecture: false,
      courseName: self.getName(),
      room: self.getRoom(),
      startTime: new Date(self.getStartTime().getTime() - self.getStartTime().getTimezoneOffset() * 60000)
                  .toISOString()
                  .slice(0, -8),
      endTime: new Date(self.getEndTime().getTime() - self.getEndTime().getTimezoneOffset() * 60000)
                .toISOString()
                .slice(0, -8)
    });
    lectureModal.onDidDismiss(data => {
      if (typeof data !== 'undefined') {
        this.modifyLecture(self, data);
        this.toasty.create({
          message : "Your lecture has been modified!",
          duration : 2500
        }).present();
      }
    })
    lectureModal.present();
  }

  private modifyLecture(self : Singleton, data : {courseName : string,
      room : string, startTime : string, endTime : string}) {
        // Find the singleton group, and then replace itself's time and singleton value
        this.lectureData[this.lectureData.findIndex(e => e.singleton === self)]
          = {
            time: this.getTimeAMPM(new Date(data["startTime"])),
            singleton: new Singleton(
                data["courseName"],
                new Date(data["startTime"]),
                new Date(data["endTime"]),
                data["room"]
              )
          }
          this.sortLectures();
          this.updateLectures();
  }

  private sortLectures() {
    this.lectureData.sort((a, b) => a["singleton"].getStartTime().getTime() 
                        - b["singleton"].getStartTime().getTime());
  }

}
