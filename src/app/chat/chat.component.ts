import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Observable} from 'rxjs';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormGroup ,Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
const MINUTES_UNITL_AUTO_LOGOUT = 0.5 // in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY =  'lastAction';

//https://chatnchat-backend.herokuapp.com/chat

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 isLoading=false;
token:string;
  userid:string;
  chatForm:FormGroup

  user:String;

  messageText:String;
  messageArray:Array<{user:String,message:String}> = [];

//

  constructor(private _chatService: ChatService , private http:HttpClient ,private auth: AuthService ,private router:Router){
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY,Date.now().toString());
    this.isLoading=true;


  // updateScroll()
  this.token=localStorage.getItem('access_token');

  if(this.token){
    this.http.get<[{creator:String, content:String}]>('http://localhost:8080/chat',{
      headers:{
        Authorization: this.token
      }
    }).subscribe(data=>{
    data.forEach(element => {
      let {
        creator:user,
        content:message

      }=element;
      // console.log(element);
      this.isLoading=false;
    this.messageArray.push({user,message});



    });
    console.log(this.messageArray);
  }
     );


  }







    this._chatService.userLeftRoom()
    .subscribe(data=>this.messageArray.push(data));

    this._chatService.newMessageReceived()
    .subscribe(data=>this.messageArray.push(data));



}

//autologout
  //auto logout
  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
 public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }
initListener() {
  document.body.addEventListener('click', () => this.reset());
  document.body.addEventListener('mouseover',()=> this.reset());
  document.body.addEventListener('mouseout',() => this.reset());
  document.body.addEventListener('keydown',() => this.reset());
  document.body.addEventListener('keyup',() => this.reset());
  document.body.addEventListener('keypress',() => this.reset());
}

reset() {
  this.setLastAction(Date.now());
}

initInterval() {
  setInterval(() => {
    this.check();
  }, CHECK_INTERVAL);
}
check() {
  const now = Date.now();
  const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
  const diff = timeleft - now;
  const isTimeout = diff < 0;

  if (isTimeout)  {
    localStorage.clear();
  this.router.navigate(['./login']);
    // alert('It seems You are Away from Chat')
  }
}


// newUserJoined(){
//   let observable=new Observable<{user:string, message:string}>(
//     observer=>{
//       this.socket.on('new user')
//     }
//   )

// }

 geek() {
  //Scrolling the document to position "250"
  //horizontally and "110" vertically
  window.scrollTo(500, 500);
}
 updateScroll(){
     var element = document.getElementById("chatBox");
      element.scrollTop = element.scrollHeight;
   }


sendMessage()
{

  this._chatService.sendMessage({user:this.user,  message:this.chatForm.get('messageText').value});





this.messageText='';

}

userInfo;
ngOnInit() {
//  this.http.get('http://localhost:8080/chat').subscribe((response: any) => {
//   console.log("response", response.{});
//   response.data.forEach(element => {
//     this.messageArray.push(element);
//   });
// })
  // this._chatService.getmessage().subscribe(data=>this.messageArray.push(data) );

  if(localStorage.getItem('status')==="1")
{
  this._chatService.newUserJoined()
  .subscribe(data=> this.messageArray.push(data));

}
  this.chatForm = new FormGroup({
    messageText: new FormControl("",Validators.required)

 });



     console.log(this.messageArray);

  this.user=localStorage.getItem('name');
  this._chatService.joinRoom({user:this.user});

  this.userid=localStorage.getItem('userId');




  // const user:any=this._chatService.getUserDel(this.userid);

}

}
