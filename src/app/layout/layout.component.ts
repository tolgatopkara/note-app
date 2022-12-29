import { HeaderComponent } from './../header/header.component';
import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone: true,
    template: `
  <app-header></app-header>
  <div class="bg-zinc-50 container mx-auto  w-144  	 h-full  overflow-hidden ">
  <router-outlet></router-outlet>
  </div>
  `,
    imports: [HeaderComponent , RouterModule]
})
export default class LayoutComponent {

}
