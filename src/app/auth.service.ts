
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   isSignup:boolean=false;
   Sp:boolean=false;
   lgout:boolean=true;

  constructor(private http: HttpClient, private router:Router, private chat: ChatService) { }
  //loggin in for login component
  login(email: string, password: string){
   return this.http.post<{token: string}>('http://localhost:8080/auth/login', {email:email, password: password})
     .pipe(
       map((result:any) => {
         localStorage.setItem('access_token', result.token);
          localStorage.setItem('userId', result.userId);
          localStorage.setItem('name', result.name);
          this.lgout=false;

         console.log(result);
          return result;
       })
     );
 }
 signup(name:string,email: string, password: string): Observable<boolean> {
  console.log("service");
  return this.http.post('http://localhost:8080/auth/signup', {name:name,email:email, password: password})
    .pipe(
      map(result => {
        console.log("User created successfully");
        console.log(result);
        // this.isSignup=true;

        return true;
      },error=>{
        console.log(error)

      }


      )

    );
}
logout() {
  this.isSignup=false;
  this.chat.userLeftRoom();
  localStorage.clear();
  this.router.navigate(['./login']);
  this.lgout=true;

}

public get loggedIn(): boolean {
  return (localStorage.getItem('access_token') !== null);
}



}
