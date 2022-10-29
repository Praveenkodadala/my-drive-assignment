import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { HttpService } from 'src/app/services/http/http.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public focus: any;
  public listTitles: any[] = [];
  public location: Location;

  
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private httpService: HttpService
  ) {
    this.location = location;
    
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle:any) => listTitle);
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logout(){
    localStorage.clear()
    this.router.navigate(["login"]);
   
  }

  goToProfile(){
    this.router.navigate(["user/userProfile"]);
  }


 


}
