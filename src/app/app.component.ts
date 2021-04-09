/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students.
* 
* Name: Brandon Cadaoas Student ID: 121 818 199 Date: Apr. 09, 2021
*
********************************************************************************/ 

import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    token: any;
    navSub: any;
    searchString: string;

  title = 'web422-a6';

  constructor(private router: Router, private aService: AuthService) { }

  ngOnInit(){
      this.navSub = this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationStart){
              this.token = this.aService.readToken();
          }
      });
  }

  ngOnDestroy(){
      this.navSub.unsubscribe();
  }

  handleSearch(): void{
    if (this.searchString){
        this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
        this.searchString = "";
    }
  }

  logout(){
      localStorage.clear();
      this.router.navigate(['/login']);
  }
}
