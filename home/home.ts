import { RestaurentDetailPage } from '../restaurent-detail/restaurent-detail';
// import { Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
// import { MyApp } from './../../app/app.component';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Datamembers } from "../../providers/datamembers/datamembers";


/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	members: Array<any>;
	loader: any;
	userDetails : any;
	responseData: any;
	user_id :any;
	token : any;
	userLogoutData :any;
	userlogincheckData:any;
  
	
	// userPostData : any;
  
	constructor(public navCtrl: NavController, public navParams: NavParams, public data:Datamembers, public loadingCtrl:LoadingController, public authService : AuthServiceProvider) {
		/**
		 * Check User Logged In Local Storage 
		**/
    //localStorage.clear();

		

		
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
		// 			// this.navCtrl.setRoot(HomePage);
		// 		} else {
		// 			this.navCtrl.setRoot(LoginPage);
		// 		}
		// 	});
		// } else {
		// 	this.navCtrl.setRoot(LoginPage);
		// }
	}

  backToWelcome(){
	//const root = this.MyApp.getRootNav();
  //root.popToRoot();
  this.navCtrl.setRoot(LoginPage);
    
  }
  /*
   * Logout Function with remove token from database too.
   */
  /* logout(){
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
*/

  ngOnInit()
  {

      this.authService.is_loginuser();

      const localdataUserLogin = JSON.parse(localStorage.getItem('isuserLogin'));
      console.log(localdataUserLogin);
      if(localdataUserLogin !="" && localdataUserLogin != null){
		//   window.location.reload();	

        if(localdataUserLogin ==='invalid'){
          this.navCtrl.setRoot(LoginPage);
        }
      }


      this.presentLoading();
      this.data.LoadMembers().subscribe(
        data => {
          this.members = data[0].restaurant;
          console.log(data);
          //this.getData(data); 
            this.loader.dismiss();
        },
        err => {
          console.log(err);
        },
        () => console.log('Movie Search Complete')
    );
	// console.log(this.data.LoadMembers());
	
	
  }


  /* 
   * Loaded View Check
   */



  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    
  }

  viewWillLeave(){
    console.log('are you sure you want to leave the page');
    return false;
  }

  restaurentdetail(rest_id){
    console.log(rest_id);
    const restaurent_data = {"rest_id": rest_id};
    this.navCtrl.push(RestaurentDetailPage,restaurent_data);
    
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
