import { HeaderComponent } from './../header/header.component';
import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone: true,
    template: `
    <div class="overflow-auto">
    <app-header></app-header>
  <div class="bg-white container mx-auto  w-144  	 h-full  ">
  <router-outlet></router-outlet>
  </div>
    </div>
  `,
    imports: [HeaderComponent , RouterModule]
})
export default class LayoutComponent {

}
