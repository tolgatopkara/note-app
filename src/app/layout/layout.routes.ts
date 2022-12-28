import { Routes } from "@angular/router";
export const routes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: 'notes'
  // },
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full'
  },
  {
    path: 'notes',
    loadComponent: () => import('../pages/notes-list/notes-list.component').then(m => m.NotesListComponent)
  },

  {
    path: 'notes/new',
    loadComponent: () => import('../pages/note-details/note-details.component').then(m => m.NoteDetailsComponent),
  },
  {
    path :'note/:id',
    loadComponent: () => import('../pages/note-details/note-details.component').then(m => m.NoteDetailsComponent),
  }



];
