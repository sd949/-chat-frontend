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
  signup:boolean=true;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name:new FormControl('', Validators.required),
      email: new FormControl("",[Validators.required,Validators.email]),
       password:new FormControl('',[
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ])
    //   password: new FormControl(null, [ Validators.required,
    //     // 2. check whether the entered password has a number
    //   CustomV  .patternValidator(/\d/, { hasNumber: true }),
    //     // 3. check whether the entered password has upper case letter
    //     CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
    //     // 4. check whether the entered password has a lower-case letter
    //     CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),

    //     Validators.minLength(8)
    //  ])
   });
  }
  public onSubmit(){

    {
     setTimeout(()=>{this.signup=false;}
     ,3000);




      console.log("inside ts1")
      this.auth.signup(this.signupForm.get("name").value, this.signupForm.get("email").value,this.signupForm.get('password').value)
        .pipe(first())
        .subscribe(
          result =>{
            this.success_message="User Created Successfully"
            this.router.navigateByUrl('/login');
             this.auth.isSignup=true;
            this.email=null;
            this.password=null;
            this.signup=true;

            this.name=null;

          } ,
          err => {
            this.error_message = 'Could not create user'

        }


        );
    }


  }

}
