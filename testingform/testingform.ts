// import { LoginPage } from './../login/login';
// import { HomePage } from '../home/home';
// import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkFirstCharacterValidator } from '../validators/validators';


/**
 * Generated class for the TestingformPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-testingform',
  templateUrl: 'testingform.html',
})
export class TestingformPage {
  
//   userData = { "username": "", "password": "", "name": "", "email": "" };


  // constructor(public authService: AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams   ){
      
  // }


  authForm : FormGroup;

	constructor(public navCtrl: NavController, fb: FormBuilder) {
		this.authForm = fb.group({
		  'username' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
		  'password': [null, Validators.compose([Validators.required, Validators.minLength(8), checkFirstCharacterValidator(/^\d/i)])],
		  'gender' : 'e'
		})  
	}
	
	submitForm(value: any):void{
		console.log('Form submited!')
		console.log(value);
	}	
  
  // @ViewChild('signupSlider') signupSlider: any;
 
  //   slideOneForm: FormGroup;
  //   slideTwoForm: FormGroup;
 
  //   submitAttempt: boolean = false;
 
  //   constructor(public navCtrl: NavController, public navParams: NavParams , public formBuilder: FormBuilder) {

  //     this.slideOneForm = formBuilder.group({
  //       firstName: [''],
  //       lastName: [''],
  //       age: ['']
  //   });
 
  //   }
 
  //   next(){
  //       this.signupSlider.slideNext();
  //   }
 
  //   prev(){
  //       this.signupSlider.slidePrev();
  //   }
 
  //   save(){
 
  //   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestingformPage');
  }

  
}
