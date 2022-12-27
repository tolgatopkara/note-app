import { Routes } from "@angular/router";
import { NoteDetailsComponent } from "../note-details/note-details.component";
import { NotesListComponent } from '../pages/notes-list/notes-list.component';
export const routes: Routes = [
  {
    path: '',
    component : NotesListComponent,
    // loadComponent: () => import('../pages/notes-list/notes-list.component').then(m => m.NotesListComponent)
  },
  {
    path :'note/:id',
    component : NoteDetailsComponent,
  }



];
