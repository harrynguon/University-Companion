import { LecturePromptPage } from './../pages/lecture-prompt/lecture-prompt';
import { AngularFirestore } from 'angularfire2/firestore';
import { Singleton } from './../CustomClass/Singleton';
import { TimerPopoverPage } from './../pages/timer-popover/timer-popover';
import { LogoutPage } from './../pages/logout/logout';
import { CourseTimeManagerPage } from './../pages/course-time-manager/course-time-manager';
import { LectureSchedulerPage } from './../pages/lecture-scheduler/lecture-scheduler';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TimerPage } from '../pages/timer/timer';

import { DataProvider } from '../providers/data/data';
import { SettingsPage } from '../pages/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    LectureSchedulerPage,
    CourseTimeManagerPage,
    TimerPage,
    SettingsPage,
    LogoutPage,
    TimerPopoverPage,
    LecturePromptPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    LectureSchedulerPage,
    CourseTimeManagerPage,
    TimerPage,
    SettingsPage,
    LogoutPage,
    TimerPopoverPage,
    LecturePromptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AngularFirestore
  ]
})
export class AppModule {}
