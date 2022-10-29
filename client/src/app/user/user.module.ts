import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

import { ComponentsModule } from '../components/components.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';




@NgModule({
  declarations: [
    UserComponent,
  

  
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule,
    NgbModule,
    ClipboardModule
  ]
})
export class UserModule { }
