import { TermsConditionsPage } from '../terms-conditions/terms-conditions';
import { HomePage } from './../home/home';
// import { LoginPage } from './../login/login';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkFirstCharacterValidator } from '../validators/validators';

import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the Registration2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration2',
  templateUrl: 'registration2.html',
})
export class Registration2Page {
  responseData:any;
  datasignup : any;
  loader : any;
  FullRegisterForm :  FormGroup;
  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public navParams: NavParams,  public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alertCtrl: AlertController,fb: FormBuilder) {

      this.FullRegisterForm = fb.group({
        "email": this.navParams.get('email'),
        "password": this.navParams.get('password'),
        "expiry_date":"",
        "card_name":"",
        "card_number":"",
        "phone_number":"",
        "cvv": "",
		    'name' : [null, Validators.compose([Validators.required])],
		    'chkterms': [null, Validators.compose([Validators.required])]
    })
     this.authService.is_loginuser();



		const localdataUserLogin = JSON.parse(localStorage.getItem('isuserLogin'));
    if(localdataUserLogin !=""){
      if(localdataUserLogin ==='valid'){
        this.navCtrl.setRoot(HomePage);
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration2Page');
  }

  submitForm(FullRegisterForm: any):void{
		console.log('Form submited!')
    console.log(FullRegisterForm);

    this.presentLoading();
    this.authService.postData(FullRegisterForm, 'signup').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      this.loader.dismiss();
      localStorage.setItem('userData', JSON.stringify(this.responseData));


      const userlocaldata = JSON.parse(localStorage.getItem('userData'));
      if(userlocaldata !="") {
        if(userlocaldata[0].error ==='' && userlocaldata[0].loggedIn =='1' ){
          this.navCtrl.setRoot(HomePage);
          console.log("userlogged in");
        } else if(userlocaldata[0].error =='0'){
          // console.log('user already exist');
          this.showToast('top', 'This user already exist! Please try another acccount');
        } else {
          // console.log( "else here");
          this.showToast('top', 'Something Went wrong!.');
        }
      }
      // console.log()
      // this.navCtrl.setRoot(LoginPage);

    });
  }

  // signup() {
  //   this.presentLoading();
  //   this.authService.postData(this.datasignup, 'signup').then((result) => {
  //     this.responseData = result;
  //     console.log(this.responseData);
  //     this.loader.dismiss();
  //     localStorage.setItem('userData', JSON.stringify(this.responseData));


  //     const userlocaldata = JSON.parse(localStorage.getItem('userData'));
  //     if(userlocaldata !="") {
  //       if(userlocaldata[0].error ==='' && userlocaldata[0].loggedIn =='1' ){
  //         this.navCtrl.setRoot(HomePage);
  //         console.log("userlogged in");
  //       } else if(userlocaldata[0].error =='0'){
  //         // console.log('user already exist');
  //         this.showToast('top', 'This user already exist! Please try another acccount');
  //       } else {
  //         // console.log( "else here");
  //         this.showToast('top', 'Something Went wrong!.');
  //       }
  //     }
  //     // console.log()
  //     // this.navCtrl.setRoot(LoginPage);

  //   });
  // }

   /*
   * Loader on page loading
   */

  presentLoading() {
      this.loader = this.loadingCtrl.create({
          content: "Loading..."
      });
      this.loader.present();
  }

  /*
   *Notification for Login invalid or valid user
   */
  showToast(position,msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: position
    });
    toast.present();
  }

  terms_conditions(){
    this.navCtrl.setRoot(TermsConditionsPage);
  }



}
