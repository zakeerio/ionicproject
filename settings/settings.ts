import { EditCcInfoPage } from '../edit-cc-info/edit-cc-info';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChangePasswordPage } from '../change-password/change-password';


/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  changepassword(){
    this.navCtrl.push(ChangePasswordPage);
  }
  edit_cc_info(){
    this.navCtrl.push(EditCcInfoPage);
  }

}
