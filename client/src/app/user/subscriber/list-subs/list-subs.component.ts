import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-list-subs',
  templateUrl: './list-subs.component.html',
  styleUrls: ['./list-subs.component.css']
})
export class ListSubsComponent implements OnInit {

  constructor(    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }

  addSubscriber(){
    let route = '/user/subscriber/add-sub'
    this.router.navigate([route])
  }

}
