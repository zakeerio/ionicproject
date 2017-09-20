import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the LogoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  	userLoginDetails : any;

    members: Array<any>;
    loader: any;
    userDetails : any;
    responseData: any;
    user_id :any;
    token : any;
    userLogoutData :any;
    userlogincheckData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public loadingCtrl: LoadingController) {



  /*
   * Logout Function with remove token from database too.
   */
			this.presentLoading();
			const userlocaldata = JSON.parse(localStorage.getItem('userData'));
			if(userlocaldata){
				// console.log(userlocaldata);
				if(userlocaldata[0].error ==='' && userlocaldata[0].loggedIn =='1'){
					this.user_id = userlocaldata[0].customer_id;
					this.token = userlocaldata[0].token;
				} 
			}

			this.userLogoutData = { "user_id" : this.user_id , "token": this.token };
			// console.log(this.userLogoutData);
			this.authService.userActivityUpdate(this.userLogoutData, 'userActivityUpdate').then((result) => {
				this.responseData = result;
				if(this.responseData.return=='success'){
					// localStorage.clear();
					localStorage.removeItem('userData');
					localStorage.removeItem("isuserLogin");

											window.location.reload();


					this.navCtrl.setRoot(LoginPage);
					
					// setTimeout(() => this.backToWelcome(), 1000);
				}
			}, (err) => {
				// Error log
		});
		
		this.loader.dismiss();


	 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
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

	backToWelcome(){
		//const root = this.MyApp.getRootNav();
		//root.popToRoot();
		this.navCtrl.setRoot(LoginPage);
    
  }



}
