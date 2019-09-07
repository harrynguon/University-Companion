import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private toasty : ToastController) {
      // this.login({
      //   email: 't@t.com',
      //   password: 'test123'
      // })
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }
    } catch (e) {
      this.toasty.create({
        message : "Invalid User/Email or the Account does not exist!",
        duration : 2000
      }).present();
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
