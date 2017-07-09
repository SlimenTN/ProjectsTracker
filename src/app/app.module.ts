import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsTypesComponent } from './projects_types/project-types.component';
import { TrackerComponent } from './tracker/tracker.component';
import { NotFoundComponent } from './not_found/not-found.component';

import {appRoutes} from './routing';

@NgModule({
  declarations: [
    AppComponent, ClientsComponent, NotFoundComponent, ProjectsComponent, ProjectsTypesComponent,
    TrackerComponent
  ],
  imports: [
    BrowserModule,
    appRoutes,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
