import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

const COMPONENTS = [
  FooterComponent,
  NavbarComponent,
  SidebarComponent
]

@NgModule({
  declarations: [...COMPONENTS ],
  imports: [
    CommonModule,
    NgbModule,
    ClipboardModule,
    RouterModule
  ],
  exports: [...COMPONENTS,
    RouterModule],
})
export class ComponentsModule { }
