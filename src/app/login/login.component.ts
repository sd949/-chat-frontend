import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  public error_message: string;

  constructor(public auth: AuthService, private router: Router, private fb:FormBuilder) {
    // localStorage.clear();

   }
  // navigateToChat() {
  //   this.router.navigateByUrl('/chat', { state: this.loginForm.value });
  //   console.log(this.loginForm.value);
  // }

  public onSubmit() {
    // console.log(this.loginForm.get("email").value, this.loginForm.get('password').value);
   this.auth.login(this.loginForm.get("email").value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe(
   result =>{
      this.router.navigateByUrl('/chat');
      localStorage.setItem('status', '1');


      },
       error=>{
        this.error_message="Invalid Credentials"

     });
        // this.navigateToChat()

    }
    ngOnInit() {
      // localStorage.clear();
      if(this.auth.loggedIn){
        this.router.navigateByUrl('/chat');

      }


      this.loginForm = new FormGroup({
            email: new FormControl("",[Validators.required,Validators.email]),
            password:new FormControl('', Validators.required)
         });
    }

//   onSubmit(){

// }
// ngOnInit() {
//   // this.loginForm=new FormGroup({
//   //   email:["",Validators.required],
//   //   password:["",Validators.required]
//   //  })
//   this.loginForm = new FormGroup({
//     email: new FormControl(),
//     password:new FormControl()
//   });
// }
}




