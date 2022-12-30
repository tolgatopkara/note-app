import { Component, OnInit } from '@angular/core';
import { NoteCardComponent } from '../../note-card/note-card.component';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { NgFor, NgForOf } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';


@Component({
  standalone : true,
  selector: 'app-notes-list',
  template: `<div [@listAnim] class="mt-20 mb-24">
<form>
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input
        class="input"
        type="text"
        placeholder="Search Mockups, Logos..."
        (keyup)="filter($any($event.target).value)"
         class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos..." required>
        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
    </div>
</form>


    <app-note-card
        *ngFor="let note of filteredNotes; index as i"
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
    trigger('listAnim', [
      transition('* => *', [
        // each time the binding value changes
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ]),
        ],
          { optional: true })
      ])
    ])
  ],
})
export class NotesListComponent implements OnInit {
  notes :Note[] = new Array<Note>();
  filteredNotes :Note[] = new Array<Note>();


  constructor(private notesService : NotesService) {
    console.log("NotesListComponent constructor");
  }
  ngOnInit(): void {
    // we need to get the notes from the service
    this.notes= this.notesService.getAll();
    this.filteredNotes = this.notesService.getAll();
    // this.filter('');
  }

  deleteNote(id:number){
    this.notesService.delete(id);
    return this.notes = this.notesService.getAll();
  }

  filter(query:string){
    query = query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();
    // split up the search query into individual words
    let terms: string[] = query.split(' ');
    // remove duplicate search terms
    terms = this.removeDuplicates(terms);
    // compile all relevant notes into the 'allResults' array
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      // append results to the allResults array
      allResults = [...allResults, ...results];
    });

    // allResults will include duplicate notes
    // because a particular note can be the result of multiple search terms
    // but we don't want to show the user the same note multiple times on the UI
    // so we first must remove any duplicates
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    // loop through the input array and add the items to the set
    arr.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevantNotes(query :string) : Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if(note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if(note.content && note.content.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })
    return relevantNotes;
  }



}
