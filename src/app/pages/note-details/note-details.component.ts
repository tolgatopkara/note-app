import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule],
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styles: [`
   input,textarea {
    &.ng-invalid.ng-touched {
    @apply border-red-600 ;
    &:focus {
      @apply shadow-sm shadow-red-800 	;
    }
  }

   }
   button[disabled]{
    @apply bg-gray-200;
   }

   `]
})
export class NoteDetailsComponent implements OnInit {

  note!: Note;
  noteId!: number;
  new!: boolean;


  constructor
    (private notesService: NotesService,
      private router: Router,
      private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // we want to find out if we are editing or creating a new note

    this.activatedRoute.params.subscribe((params: Params) => {
      this.note = new Note();

      if (params['id']) {
        console.log(params['id'])
        // we are editing
        this.note = this.notesService.get(params['id']);
        this.noteId = params['id'];
        this.new = false;
      } else {
        console.log(params['id'])

        // we are creating a new note
        this.new = true;
      }
    })




  }

  // title! : Note["title"];
  // content! : Note["content"];


  onSubmit(form: NgForm) {
    // save the note
    // console.log(form.valid)
    // console.table(form.value);

    if (this.new) {
      // add a new note
      this.notesService.add(this.note);
    }
    else {
      // update the note
      this.notesService.update(this.noteId, form.value.title, form.value.content);
    }
    this.router.navigate(['/notes']);

  }

  onCancel() {
    this.router.navigate(['/notes']);
  }

}
