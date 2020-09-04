
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   isSignup:boolean=false;
   Sp:boolean=false;
   lgout:boolean=true;

  constructor(private http: HttpClient) { }
  //loggin in for login component
  login(email: string, password: string){
   return this.http.post<{token: string}>('https://chatnchat-backend.herokuapp.com/auth/login', {email:email, password: password})
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
  return this.http.post('https://chatnchat-backend.herokuapp.com/auth/signup', {name:name,email:email, password: password})
    .pipe(
      map(result => {
        console.log("User created successfully");
        // this.isSignup=true;

        return true;
      }

      )

    );
}
logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('name');
  this.lgout=true;

}

public get loggedIn(): boolean {
  return (localStorage.getItem('access_token') !== null);
}



}
