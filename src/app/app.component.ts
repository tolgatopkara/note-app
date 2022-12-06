import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone : true,
  template : `
  <router-outlet></router-outlet>
  <h3>Hello Angular</h3>
  `,
  styles : [  ],
  imports : [ RouterModule],
  providers: [ ]
})
export class AppComponent {
  title = 'note-app';

}
