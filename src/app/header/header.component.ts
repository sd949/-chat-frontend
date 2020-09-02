import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth:AuthService,private router:Router ,private chat:ChatService) { }

  ngOnInit(): void {
  }

  logout() {
    console.log('logout');
    this.chat.userLeftRoom();

    this.auth.logout();
    this.router.navigate(['login']);
  }

}
