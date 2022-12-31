import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();

  constructor() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this.notes =  JSON.parse(storedNotes);
    }

  }



  getAll() {
    return this.notes;
  }

  get(id: number) {
    return this.notes[id];
  }

  getId(note: Note) {
    return this.notes.indexOf(note);
  }

  add(note: Note) {
    const newLength = this.notes.push(note);
    const index = newLength - 1;
    // Store the updated notes array in local storage
    localStorage.setItem('notes', JSON.stringify(this.notes));
    return index;
  }

  update(id: number, title: string, content: string) {
    const note = this.notes[id];
    note.title = title;
    note.content = content;
    // Store the updated notes array in local storage
    localStorage.setItem('notes', JSON.stringify(this.notes));

  }

  delete(id: number) {
    this.notes.splice(id, 1);
    // Store the updated notes array in local storage
    localStorage.setItem('notes', JSON.stringify(this.notes));

  }

}
