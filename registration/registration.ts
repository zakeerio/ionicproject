import { Registration2Page } from './../registration2/registration2';
import { LoginPage } from './../login/login';
import { HomePage } from '../home/home';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkFirstCharacterValidator } from '../validators/validators';

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  datasignup ='';

  members: Array<any>;
	loader: any;
	userDetails : any;
	responseData: any;
	user_id :any;
	token : any;
	userLogoutData :any;
  userlogincheckData:any;
  RegisterForm :  FormGroup;

  // datasignup = { "email": "", "password": "" };


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController,  public authService: AuthServiceProvider, fb: FormBuilder) {
    /**
		 * Check User Logged In Local Storage
    **/

     this.RegisterForm = fb.group({
		  'email' : [null, Validators.compose([Validators.required])],
		  'password': [null, Validators.compose([Validators.required, Validators.minLength(8), checkFirstCharacterValidator(/^\d/i)])]
    })

    this.authService.is_loginuser();



		const localdataUserLogin = JSON.parse(localStorage.getItem('isuserLogin'));
    if(localdataUserLogin !="" && localdataUserLogin != null){
      if(localdataUserLogin ==='valid'){
        this.navCtrl.setRoot(HomePage);
      }
    }


		// const userlocaldata = JSON.parse(localStorage.getItem('userData'));
		// if(userlocaldata){
		// 	//   console.log(userlocaldata);
		// 	let loginvalid

		// 	if(userlocaldata[0].error ==='' && userlocaldata[0].loggedIn =='1'){
		// 		this.user_id = userlocaldata[0].customer_id;
		// 		this.token = userlocaldata[0].token;
		// 	}
		// 	this.userlogincheckData = { "user_id" : this.user_id , "token": this.token };
		// 	var test = this.authService.userlogincheck(this.userlogincheckData, 'userlogincheck').then((result) => {
		// 		this.responseData = result;

		// 		loginvalid = this.responseData.validate;
		// 		console.log(loginvalid);
		// 		// this.logincheck();

		// 		if(userlocaldata[0].error ==='' && userlocaldata[0].loggedIn =='1' && loginvalid == 'valid' ){
		// 			// console.log('Im here'+userlocaldata[0]);
		// 			this.navCtrl.setRoot(HomePage);
		// 		} else {
		// 			// this.navCtrl.setRoot(LoginPage);
		// 		}
		// 	});
		// } else {
		// 	this.navCtrl.setRoot(LoginPage);
		// }

  //   const userlocaldata = JSON.parse(localStorage.getItem('userData'));
  //   if(userlocaldata){
  //     if(userlocaldata[0].error ==''){
  //       this.navCtrl.setRoot(HomePage);
  //     }
  //   } else {
  //       // this.navCtrl.setRoot(LoginPage);
  //   }
  }

  submitForm(datasignup: any):void{
		console.log('Form submited!')
    console.log(datasignup);
    let datasignupdata = { "email": datasignup.email, "password": datasignup.password };
    // this.loader.dismiss();

    // console.log(datasignupdata);


    this.navCtrl.push(Registration2Page, datasignupdata);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }


  // signuppage2() {
  //   // this.presentLoading();
  //   let datasignupdata = { "email": this.datasignup.email, "password": this.datasignup.password };
  //   // this.loader.dismiss();

  //   // console.log(datasignupdata);


  //   this.navCtrl.push(Registration2Page, datasignupdata);

  // }



  login() {
    //Login page link
    console.log("working here");
    this.navCtrl.push(LoginPage);
  }
   presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Loading..."
        });
        this.loader.present();
    }

}
