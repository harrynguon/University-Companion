import { AngularFirestore } from 'angularfire2/firestore';
import { DataProvider } from './../../providers/data/data';
import { AngularFireDatabase } from 'angularfire2/database';
import { LectureSchedulerPage } from './../lecture-scheduler/lecture-scheduler';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Observable } from 'rxjs';
import { Singleton } from '../../CustomClass/Singleton';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,
    private toast: ToastController, private dataProvider : DataProvider,
    private angularFireStore : AngularFirestore) {

  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: "Welcome to the SWEN325 Ionic App!",
          duration: 2000
        }).present();
      } else {
        this.toast.create({
          message: "Could not find authentication details",
          duration: 3000
        }).present();
      }
    });

    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        let userID = this.afAuth.auth.currentUser.uid;
        this.angularFireStore.doc('users/'+userID).set({ }, { merge: true }); // ensure document exists
        this.angularFireStore.doc('users/'+userID).valueChanges().subscribe(datas => {
          this.dataProvider.setLectureData(this.convertToSingleton(datas["data"]));
          this.dataProvider.setTimerInterval(Number(datas["pomodoroTimer"]));
        });
      }
    });
  }

  convertToSingleton(data : { time: string, singleton: {name, startTime, endTime, room} }[]) {
    if (typeof data !== 'undefined') {
      if (data.length > 0) { 
        return data.map(lecture =>
          ({
          time: lecture["time"],
          singleton: new Singleton(lecture["singleton"]["name"], 
                                  new Date(lecture["singleton"]["startTime"]),
                                  new Date(lecture["singleton"]["endTime"]),
                                  lecture["singleton"]["room"])
          }
        ));
    }
    }
  }

}
