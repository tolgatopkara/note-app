import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule,RouterModule],
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styles: [`
   .disabled{
    @apply bg-gray-200;
   }
   input,textarea {

    &.ng-invalid.ng-touched {
    @apply border-red-600 ;
    &:focus {
      @apply shadow-sm shadow-red-800 	;
    }

  }

   }

   `]
})
export class NoteDetailsComponent implements OnInit {

  note!: Note;


  constructor(private notesService: NotesService,private router : Router) {
    console.log("NoteDetailsComponent constructor");
  }

  ngOnInit(): void {
    this.note = new Note();
  }

  // title! : Note["title"];
  // content! : Note["content"];


  onSubmit(form: NgForm) {
    // save the note
    console.log(form.valid)
    console.table(form.value);
    this.notesService.add(this.note);
    this.router.navigate(['/notes']);
  }

}
