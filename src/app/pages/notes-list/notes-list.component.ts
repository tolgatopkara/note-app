import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NoteCardComponent } from '../../note-card/note-card.component';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { NgFor, NgForOf } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';


@Component({
  standalone : true,
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
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

  @ViewChild ('filterInput') filterInputElRef! : ElementRef<HTMLInputElement>;


  constructor(private notesService : NotesService) {
    console.log("NotesListComponent constructor");
  }
  ngOnInit(): void {
    // we need to get the notes from the service
    this.notes= this.notesService.getAll();
    this.filter('');
    // this.filteredNotes = this.notesService.getAll();
  }

  deleteNote(note : Note){
    const noteId = this.notesService.getId(note);
    this.notesService.delete(noteId);
    this.filter(this.filterInputElRef.nativeElement.value);
    return this.notes = this.notesService.getAll();
  }

  generateNoteUrl(note : Note){
    const noteId = this.notesService.getId(note);
    return noteId;
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
      const results: Note[] = this.relevantNotes(term);
      // append results to the allResults array
      allResults = [...allResults, ...results];
    });

    // allResults will include duplicate notes
    // because a particular note can be the result of multiple search terms
    // but we don't want to show the user the same note multiple times on the UI
    // so we first must remove any duplicates
    const uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    // now sort by relevancy
    this.sortByRelevancy(allResults);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeDuplicates(arr: Array<any>): Array<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniqueResults: Set<any> = new Set<any>();
    // loop through the input array and add the items to the set
    arr.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevantNotes(query :string) : Array<Note> {
    query = query.toLowerCase().trim();
    const relevantNotes = this.notes.filter(note => {
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


  sortByRelevancy(searchResults: Note[]){

    // this method will calculate the relevancy of a note based on the number of times it appears in the search results
    const noteCountObj :{ [noteId: string]: number } = {}; // format - key: value => NoteId: int (Note Object Id)

    searchResults.forEach(note => {
      const noteId = this.notesService.getId(note); // get the note id
      if(noteCountObj[noteId]){
        noteCountObj[noteId] += 1;
      }
      else{
        noteCountObj[noteId] = 1;
      }
    });

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      const aId = this.notesService.getId(a);
      const bId = this.notesService.getId(b);

      const aCount = noteCountObj[aId];
      const bCount = noteCountObj[bId];

      return bCount - aCount;
    });
  }

}
