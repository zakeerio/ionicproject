import { BookRestaurantPage } from '../book-restaurant/book-restaurant';
import { Datamembers } from '../../providers/datamembers/datamembers';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the RestaurentDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-restaurent-detail',

  styles: [ `
   
    .card-background-page {
      background-image: url("../../assets/images/photo3.jpg");
      //  border: 5px solid green; 
    }

  `],
  templateUrl: 'restaurent-detail.html'
})
export class RestaurentDetailPage {

    datarestaurent : any;
    rest_detail : Array<any>;
    loader : any;
    itemsSet : any;
    members : any;
    
    // restaurent_detail : any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public data:Datamembers, public loadingCtrl:LoadingController, public authService : AuthServiceProvider) {
    

    console.log(this.navParams.get("rest_id"));
    // this.itemsSet = this.loadRestaurentDetails();
    this.loadRestaurents();
    
    this.backgroundimg();

    // console.log(this.loadRestaurents() + "This is point here");
    


  }

  // loadRestaurentDetails(){
    
  //     // console.log(restaurent_detail);
      
  // }
    ngOnInit(){
     
    this.presentLoading();
    // let restaurent_detail
    this.data.restaurentDetail(this.navParams.get("rest_id")).subscribe(
        data => {
          this.rest_detail = data[0].restaurent;
          console.log(this.rest_detail); 
        },
        err => {
          console.log(err);
        },
        () => console.log('Movie Search Complete')
    );

    this.loader.dismiss();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurentDetailPage');
  }

  loadRestaurents(){
    //  this.presentLoading();
      this.data.LoadMembers().subscribe(
        data => {
          this.members = data[0].restaurant;
          console.log(data);
          //this.getData(data); 
            // this.loader.dismiss();
        },
        err => {
          console.log(err);
        },
        () => console.log('Movie Search Complete')
    );

  }

  loadRestaurentDetails(){

  }

  backgroundimg(){
      
      console.log(this.rest_detail);
    }

  bookRestaurent(rest_id){
    console.log(rest_id);
    let restaurentData = {"rest_id": rest_id};
    this.navCtrl.push( BookRestaurantPage,restaurentData );
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
