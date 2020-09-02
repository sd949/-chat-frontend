import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public email: string;

  public password: string;
  public name: string;



  public error: string;
  public success_message:string;
  public error_message:string;
  signupForm : FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name:new FormControl('name', Validators.required),
      email: new FormControl("email",Validators.required),
      password:new FormControl('password', Validators.required)
   });
  }
  public onSubmit(){
    {
      console.log("inside ts")
      this.auth.signup(this.signupForm.get("name").value, this.signupForm.get("email").value,this.signupForm.get('password').value)
        .pipe(first())
        .subscribe(
          result =>{
            this.success_message="User Created Successfully"
            this.email=null;
            this.password=null;

            this.name=null;

          } ,
          err => this.error_message = 'Could not create user'
        );
    }


  }

}
