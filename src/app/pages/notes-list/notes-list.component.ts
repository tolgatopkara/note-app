import { Component, OnInit } from '@angular/core';
import { NoteCardComponent } from '../../note-card/note-card.component';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { NgFor, NgForOf } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  standalone : true,
  selector: 'app-notes-list',
  template: `<div class="mt-20 mb-24">
    <app-note-card
        *ngFor="let note of notes; index as i"
        [@itemAnim]
        link="/note/{{i}}"
        (deleteEvent)= "deleteNote(i)"
        [title]="note.title"
        [content]="note.content"
        class="mb-6 block"></app-note-card>
    <button routerLink="/notes/new" class=" h-16 text-xl  bg-gradient-to-r from-green-400 to-blue-500 rounded-md  fixed bottom-0 w-144 shadow-md shadow-purple-600">
   Add
  </button>


  </div>
   `,
  imports : [  NoteCardComponent, NgFor , NgForOf, RouterModule, ],
  animations: [
    trigger('itemAnim', [
      // Entry Animation
      transition('void => *', [
        // Initial state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          // we have to 'expand' out the padding properties
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }),
        // we first want to animate the spacing (which includes height and margin)
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
        animate(90)
      ]),
      transition('* => void', [
        // first scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        // then scale down back to normal size while beginning to fade out
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        // scale down and fade out completely
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
        // then animate the spacing (which includes height and margin)
        animate('150ms ease-out', style({
          height: 0,
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }))
      ])

    ]),
  ],
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

  deleteNote(id:number){
    this.notesService.delete(id);
    return this.notes = this.notesService.getAll();

  }

}
