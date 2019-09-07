import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth : AngularFireAuth, private toasty : ToastController) {
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      this.toasty.create({
        message : "Your account has been created!",
        duration : 2000
      }).present();
      this.navCtrl.pop();
    } catch (e) {
      this.toasty.create({
        message : "Is your email format correct? Is your password longer than 6 characters? The email may \
        have already been taken.",
        duration : 2000
      }).present();
    }
  }
}
