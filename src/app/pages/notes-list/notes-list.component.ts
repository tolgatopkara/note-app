import { Component } from '@angular/core';
import { NoteCardComponent } from '../../note-card/note-card.component';


@Component({
  standalone : true,
  selector: 'app-notes-list',
  template: `<div class="mt-4">
  <div>
    <app-note-card title="cardTitle" body="test"  class="block mb-6"></app-note-card>
  </div>
  </div>
   `,
  imports : [  NoteCardComponent]
})
export class NotesListComponent {
}
