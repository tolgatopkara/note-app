import { Component } from '@angular/core';

@Component({
  standalone : true,
  selector: 'app-header',
  template :
  `
  <div class="top-0 fixed z-10 w-full flex justify-center items-center bg-gradient-to-r from-sky-600 to-teal-500 h-14 ">
  <p class="text-xl text-white">Notes App</p>
  </div>
  `
})
export class HeaderComponent {

}
