import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';

  btnDisabled = false;

  constructor(private router: Router, private data: DataService, private rest: RestApiService) { }

  ngOnInit() {
  }

  validate() {
    if(this.name){
      if(this.email){
        if(this.password){
          if(this.password1){
            if(this.password1 === this.password1){
            return true;
          } else {
            this.data.error('Passwords do not match');
          }
        } else {
          this.data.error('Configuration Password is not entered');
        }
      } else {
        this.data.error('Password is not entered');
      }
    } else {
      this.data.error('Email is not entered');
    }
  } else {
    this.data.error('Name is not entered');
  }
  }
  
async register() {
  this.btnDisabled= true;
  try {
    if(this.validate()){
      const data = await this.rest.post(
        'http://localhost:3030/api/accounts/signup',
      {
        name: this.name,
        email: this.email,
        password: this.password
      }
      );
      if(data ['success']){
        localStorage.setItem('token', data['token']);
        this.data.success('Registration Successfull');
        await this.data.getProfile();
        this.router.navigate(['/profile']);
      } else{
        this.data.error(data['messsage']);
      }
      }
  } catch (error){
    this.data.error(error['message']);
  }
  this.btnDisabled = false;
}
}
 

