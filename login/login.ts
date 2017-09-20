import { RegistrationPage } from '../registration/registration';
import { HomePage } from './../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  // userLoginData = { "username": "", "password": "" };

  userLoginData = '';

  userDetails : any;
  userPostData: any;
  members: Array<any>;
	loader: any;
	user_id :any;
	token : any;
	userLogoutData :any;
  userlogincheckData:any;
  loginForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, fb: FormBuilder ) {
    /**
      * Check User Logged In Local Storage
      **/
    //localStorage.clear();

    // this.authService.is_loginuser();


		// const localdataUserLogin = JSON.parse(localStorage.getItem('isuserLogin'));
    // if(localdataUserLogin){
    //   console.log(localdataUserLogin+" CECKING HERE ");
    //   if(localdataUserLogin ==='valid'){
    //     setTimeout(function() {
    //       this.navCtrl.setRoot(HomePage);

    //     }, 5000);
    //   }
    // }

    this.loginForm = fb.group({
		  'username' : [null, Validators.compose([Validators.required])],
		  'password': [null, Validators.compose([Validators.required])]
    })


    const userlocaldata = JSON.parse(localStorage.getItem('userData'));
		if(userlocaldata != null && userlocaldata !=''){
			  console.log(userlocaldata+" Constructor ");
			let loginvalid

			if(userlocaldata[0].error ==='' && userlocaldata[0].loggedIn =='1'){
				this.user_id = userlocaldata[0].customer_id;
				this.token = userlocaldata[0].token;
      }
      if(this.user_id !="" || this.token !='') {
        this.userlogincheckData = { "user_id" : this.user_id , "token": this.token };
        this.authService.userlogincheck(this.userlogincheckData, 'userlogincheck').then((result) => {
          this.responseData = result;

          loginvalid = this.responseData.validate;
          console.log(loginvalid);
          // this.logincheck();

          if(userlocaldata[0].error ==='' && userlocaldata[0].loggedIn =='1' && loginvalid == 'valid' ){
            // console.log('Im here'+userlocaldata[0]);
            // window.location.reload();
            this.navCtrl.setRoot(HomePage);

          }
        });

      }

		} else {
			// this.navCtrl.setRoot(LoginPage);
		}


  }

  /*
   * Loaded View Check
   */

submitForm(userLoginData: any):void{
		console.log('Form submited!')
    console.log(userLoginData);
     /*
      do our own initial validation
      */

      this.authService.postLoginData(userLoginData, 'login').then((result) => {
      this.responseData = result;
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      //this.loader.dismiss();
      const userlocaldata = JSON.parse(localStorage.getItem('userData'));
      if(userlocaldata !=""){
        if(userlocaldata[0].error ==='' && userlocaldata[0].loggedIn =='1' ){
            window.location.reload();

          this.navCtrl.setRoot(HomePage);
        } else if(userlocaldata[0].error =='0'){
          this.showToast('top', 'This user is Inactive please verify your email!');
        } else {
          this.showToast('top', 'Username or password incorrect! Please try again.');
        }
      }
    }, (err) => {
      // Error log
    });
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

   /*
    * Submit lOGIN form and redirect or push Notification
    */

  // userLoginSubmit() {
  //   //this.presentLoading();

  //   /*
  //     do our own initial validation
  //     */
  //     if(userLoginData.username === '' || userLoginData.password === '') {
  //       let alert = this.alertCtrl.create({
  //         title:'Login Error',
  //         subTitle:'All fields are rquired',
  //         buttons:['OK']
  //       });
  //       alert.present();
  //       return;
  //     }

  //     this.authService.postLoginData(userLoginData, 'login').then((result) => {
  //     this.responseData = result;
  //     localStorage.setItem('userData', JSON.stringify(this.responseData));
  //     //this.loader.dismiss();
  //     const userlocaldata = JSON.parse(localStorage.getItem('userData'));
  //     if(userlocaldata !=""){
  //       if(userlocaldata[0].error ==='' && userlocaldata[0].loggedIn =='1' ){
  //           window.location.reload();

  //         this.navCtrl.setRoot(HomePage);
  //       } else if(userlocaldata[0].error =='0'){
  //         this.showToast('top', 'This user is Inactive please verify your email!');
  //       } else {
  //         this.showToast('top', 'Username or password incorrect! Please try again.');
  //       }
  //     }
  //   }, (err) => {
  //     // Error log
  //   });
  // }
  signup(){
    this.navCtrl.setRoot(RegistrationPage);
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

  /*
   * Loader on page loading
   */

  presentLoading() {
      this.loader = this.loadingCtrl.create({
          content: "Loading..."
      });
      this.loader.present();
  }

}
