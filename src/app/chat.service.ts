
import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private http:HttpClient) { }
  private socket = io('http://localhost:8080');


  joinRoom(data)
    {
      console.log(data);
        this.socket.emit('join',data);

    }


  sendMessage(data)
    {
        this.socket.emit('message',data);
    }
    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }



    userLeftRoom(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
//     getmessage(){
//       let observable = new Observable<{user:String, message:String}>(observer=>
//         {
//           this.socket.on('get message', (data)=>{
//         observer.next(data);
//     });
//     return () => {this.socket.disconnect();}
// }
//       );
//       return observable;
//     }
getmessage():Observable<{user:String, message:String}>{
  // console.log("get message");
  console.log(this.http.get<{user:String, message:String}>('http://localhost:8080/chat'));

      return this.http.get<{user:String, message:String}>('http://localhost:8080/chat');
    }


    // :Observable<{user:String, message:String}>{
    //   // console.log(this.http.get<User[]>(this.apiurl));
    //   return this.http.get<{user:String, message:String}>(this._apiurl);
    // }



    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}
