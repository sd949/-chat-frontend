import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  val:string;


  constructor(public auth:AuthService,private router:Router ,private chat:ChatService) { }




  ngOnInit(): void {

  }





  logout() {
    this.auth.logout();
  }




}
