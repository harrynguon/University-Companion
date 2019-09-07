import { LectureSchedulerPage } from './../pages/lecture-scheduler/lecture-scheduler';
import { TimerPage } from './../pages/timer/timer';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Alert, AlertController, NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { CourseTimeManagerPage } from '../pages/course-time-manager/course-time-manager';
import { LogoutPage } from '../pages/logout/logout';
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
      private alertCtrl : AlertController, private afAuth : AngularFireAuth,
       private toasty : ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage },
      { title: 'Course Timetable', component: LectureSchedulerPage },
      // { title: 'Course Workload Manager', component: CourseTimeManagerPage },
      { title: 'Study Timer', component: TimerPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Log Out', component: null }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.title != 'Log Out') {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Confirm',
        message: 'Do you wish to log out?',
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
              this.afAuth.auth.signOut().then(() =>{
                this.nav.setRoot(LoginPage);
                this.toasty.create({
                  message : "You have successfully been logged out!",
                  duration : 2500
                }).present();
              } );
            }
          }
        ]
      });
      alert.present();
    }
  }
}
