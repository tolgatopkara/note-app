import { HeaderComponent } from './../header/header.component';
import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone: true,
    template: `
  <app-header></app-header>
  <div class="bg-zinc-200 container mx-auto px-8  max-w-2xl	 h-full  overflow-hidden ">
  <router-outlet></router-outlet>
  </div>
  `,
    imports: [HeaderComponent , RouterModule]
})
export default class LayoutComponent {

}
