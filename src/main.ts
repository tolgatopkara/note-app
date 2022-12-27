import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, Route, withPreloading, withRouterConfig } from '@angular/router';
import AppComponent from "./app/app.component";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core'


const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import("./app/layout/layout.component"),
    loadChildren: () => import("./app/layout/layout.routes").then(m => m.routes),
  },
];

bootstrapApplication(AppComponent,
  {
    providers: [
    provideAnimations(),
    provideRouter(appRoutes, withPreloading(PreloadAllModules), withRouterConfig({ onSameUrlNavigation: 'reload' })),
    importProvidersFrom(BrowserAnimationsModule,BrowserModule)

]
  }).catch((err) => console.log(err)
  );

