import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
@Component({
  selector: 'app-vq-dash',
  templateUrl: './vq-dash.component.html',
  styleUrls: ['./vq-dash.component.css']
})
export class VqDashComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    
  }

  ngOnInit(): void {
  }

  createvqForm(){
    let route = '/user/vq/vqForm'
    this.router.navigate([route])
  }

}
