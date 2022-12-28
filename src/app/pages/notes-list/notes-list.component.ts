import { Component, OnInit } from '@angular/core';
import { NoteCardComponent } from '../../note-card/note-card.component';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { NgFor, NgForOf } from '@angular/common';
import {  RouterModule } from '@angular/router';


@Component({
  standalone : true,
  selector: 'app-notes-list',
  template: `<div class="mt-4">
  <div>
    <app-note-card *ngFor="let note of notes" [title]="note.title" [content]="note.content"  class="block mb-6"></app-note-card>
  </div>
  <button routerLink="/notes/new" class=" h-16 text-xl  bg-gradient-to-r from-green-400 to-blue-500  fixed bottom-0 w-full shadow-md shadow-purple-600">
   Add
  </button>
  </div>
   `,
  imports : [  NoteCardComponent, NgFor , NgForOf, RouterModule]
})
export class NotesListComponent implements OnInit {
  notes :Note[] = new Array<Note>();


  constructor(private notesService : NotesService) {
    console.log("NotesListComponent constructor");
  }
  ngOnInit(): void {
    // we need to get the notes from the service
   this.notes= this.notesService.getAll();
  }

}
