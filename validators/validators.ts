// import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

// /**
//  * Generated class for the ValidatorsPage page.
//  *
//  * See http://ionicframework.com/docs/components/#navigation for more info
//  * on Ionic pages and navigation.
//  */

// @Component({
//   selector: 'page-validators',
//   templateUrl: 'validators.html',
// })
// export class ValidatorsPage {

//   constructor(public navCtrl: NavController, public navParams: NavParams) {
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad ValidatorsPage');
//   }

// }


import { AbstractControl, ValidatorFn } from '@angular/forms';

export function checkFirstCharacterValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const valid = /^\d/.test(control.value);
	return (valid) ? {checkFirstCharacterValidatorOutput: true} : null;
  };
}