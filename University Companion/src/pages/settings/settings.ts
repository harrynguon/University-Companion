import { AngularFireAuth } from 'angularfire2/auth';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  protected continuousTimerSequence: boolean;
  protected pomodoroTimerInterval: number; // Seconds

  constructor(public navCtrl: NavController, public navParams: NavParams,
      protected dataProvider : DataProvider, private angularFireAuth : AngularFireAuth,
      private angularFireStore : AngularFirestore) {
        this.pomodoroTimerInterval = dataProvider.getTimerInterval();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  updateInterval() {
    this.angularFireStore
      .collection('users')
      .doc(this.angularFireAuth.auth.currentUser.uid)
      .update({
        pomodoroTimer : this.pomodoroTimerInterval.toString()
      });
  }

}