import { RestaurentDetailPage } from './../restaurent-detail/restaurent-detail';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Datamembers } from '../../providers/datamembers/datamembers';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkFirstCharacterValidator } from '../validators/validators';

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the BookRestaurantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-restaurant',
  templateUrl: 'book-restaurant.html',
})
export class BookRestaurantPage {

	members: Array<any>;
	loader: any;
	userDetails : any;
	responseData: any;
	user_id :any;
	token : any;
	userLogoutData :any;
	userlogincheckData:any;
	databooking : any;
	customer_id : any;
	dataresult : any;
	databookingExist :any;
	BookingForm :  FormGroup;

	constructor(public navCtrl: NavController, public navParams: NavParams, public data:Datamembers,public alertCtrl:AlertController,  public loadingCtrl:LoadingController, public authService : AuthServiceProvider, fb: FormBuilder) {

		let rest_id = this.navParams.get('rest_id');
		const localdataUserLogin = JSON.parse(localStorage.getItem('isuserLogin'));
		console.log(localdataUserLogin);
		if(localdataUserLogin !="" && localdataUserLogin != null){
			//   window.location.reload();
			if(localdataUserLogin ==='valid'){
				const userlogincheckData = JSON.parse(localStorage.getItem('userData'));
				this.customer_id = userlogincheckData[0].customer_id;
				// console.log(userlogincheckData[0].email);
			}
		}

		//this.databooking = {};
		//this.databookingExist = {"customer_id" : this.customer_id,"rest_id" : rest_id,"booking_date" : "","no_of_people" : "","booking_comment" : "" };
    this.BookingForm = fb.group({
       "customer_id" : this.customer_id,
       "rest_id" : rest_id,
       'booking_date' : [null, Validators.compose([Validators.required])],
       'no_of_people' : [null, Validators.compose([Validators.required])],
       'booking_time' : [null, Validators.compose([Validators.required])],
       "booking_comment" : ""

    })

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BookRestaurantPage');
	}

	ngOnInit(){
		this.authService.is_loginuser();
		this.presentLoading();


		const localdataUserLogin = JSON.parse(localStorage.getItem('isuserLogin'));
		console.log(localdataUserLogin);
		if(localdataUserLogin !="" && localdataUserLogin != null){
			//   window.location.reload();

			if(localdataUserLogin ==='invalid'){
				this.navCtrl.setRoot(LoginPage);
			} else {
				const userlogincheckData = JSON.parse(localStorage.getItem('userData'));
				// console.log(userlogincheckData[0].email);
				this.userDetails = { "name": userlogincheckData[0].name, "phone_number": userlogincheckData[0].phone_number, "email" : userlogincheckData[0].email};
			}
		}
		this.loader.dismiss();
    }

    book_restaurentForm(BookingForm: any):void{
  		console.log('Form submited!')
      console.log(BookingForm);
      this.presentLoading();
  		this.authService.postData(BookingForm, 'book_restaurent').then((result) => {
  			this.responseData = result;
  			console.log(this.responseData);
  			if(this.responseData[0].error == ''){ // Added Successfully.
  				this.bookingSuccessPopup(this.responseData[0].booking_id, this.responseData[0].restaurant_id);
  				// console.log(this.responseData[0].booking_date);
  				// console.log(this.responseData[0].booking_time);
  			} else {
  				// console.log(this.responseData[0].booking_date);
  				this.bookingErrorPopup(BookingForm);
  			}
  			this.loader.dismiss();

  		});

    }

	//   book_restaurent() {
	// 	this.presentLoading();
	// 	this.authService.postData(this.databooking, 'book_restaurent').then((result) => {
	// 		this.responseData = result;
	// 		console.log(this.responseData);
	// 		if(this.responseData[0].error == ''){ // Added Successfully.
	// 			this.bookingSuccessPopup(this.responseData[0].booking_id, this.responseData[0].restaurant_id);
	// 			// console.log(this.responseData[0].booking_date);
	// 			// console.log(this.responseData[0].booking_time);
	// 		} else {
	// 			// console.log(this.responseData[0].booking_date);
	// 			this.bookingErrorPopup(this.responseData[0].restaurant_id, this.responseData[0].booking_date);
	// 		}
	// 		this.loader.dismiss();

	// 	});
	// }

	bookingSuccessPopup(bookingId, rest_id) {

		this.data.bookingConfirmSuccess("booking_id",bookingId).subscribe(
			data => {
				this.dataresult = data.resultset;
				console.log(this.dataresult);
				console.log(this.BookingForm);

				let prompt = this.alertCtrl.create({
				title: 'Booking confirmation',
				message: "<center><b>"+this.dataresult.name+"</b> <br><br> <b>"+this.dataresult.booking_date+"</b> at "+this.dataresult.booking_time+" for <b>"+this.dataresult.no_of_people+"</b> people <br> Get there by "+this.dataresult.more_30_minutes+" in a group of minimum 3 people or cancel the reservation by "+this.dataresult.less_30_minutes+" to get refound.",

				buttons: [
					{
						text: 'Share',
						handler: data => {
							console.log('Cancel clicked');
						}
					},
				{
					text: 'OK got it!',
					handler: data => {
						const restaurent_data = {"rest_id": rest_id};
						this.navCtrl.push(RestaurentDetailPage,restaurent_data);
						console.log('Book clicked');


						}
					}
				]
				});
				prompt.present();
			},
			err => {
			console.log(err);
			},
			() => console.log('Movie Search Complete')
		);


	}

	bookingErrorPopup(bookingErrorData){

		// this.data.getSingleRecord('booking',"rest_id",rest_id).subscribe(
		// 	data => {
		// 	this.dataresult = data[0].resultset;
		// 	console.log(this.dataresult);
				console.log(bookingErrorData);

				let prompt = this.alertCtrl.create({
				title: 'Booking confirmation',
				message: "We are Sorry but the hour you selected is not available on <b>"+bookingErrorData.booking_date+"</b>",
				inputs: [
					{
					name: 'booking_time',
					placeholder: 'Select another hour',
					type: 'time'

					},
				],
				buttons: [
					{
						text: 'Cancel',

						handler: data => {
							console.log('Cancel clicked');
							this.bookingCancelPopup(bookingErrorData);
						}
					},
				{
					text: 'Book',
					handler: data => {
						console.log('Book clicked');

						console.log(JSON.stringify(data)); //to see the object

						var obj = JSON.parse(this.databookingExist);
						obj.push({ "booking_time" : data.booking_time });
						this.databookingExist = JSON.stringify(obj);
						console.log(data.booking_time);
						console.log(this.databookingExist);


						}
					}
				]
				});
				prompt.present();
		// 	},
		// 	err => {
		// 	console.log(err);
		// 	},
		// 	() => console.log('Movie Search Complete')
		// );




	}


	bookingCancelPopup(bookingdata) {

		console.log(bookingdata);

		let prompt = this.alertCtrl.create({
		title: 'Booking Cancelled',
		message: "<center><b>"+this.userDetails.name+"</b> <br><br> We are sorry but your reservation for <b>"+bookingdata.no_of_people+" people</b> on </b><b>"+bookingdata.booking_date+"</b> at "+bookingdata.booking_time+" could'nt be made.  ",

		buttons: [

		{
			text: 'Go Back',
			handler: data => {
				const restaurent_data = {"rest_id": bookingdata.rest_id};
				this.navCtrl.push(RestaurentDetailPage,restaurent_data);
				console.log('go back clicked');
				}
			}
		]
		});
		prompt.present();
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
