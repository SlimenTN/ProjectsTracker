import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsTypesComponent } from './projects_types/project-types.component';
import { TrackerComponent } from './tracker/tracker.component';
import { NotFoundComponent } from './not_found/not-found.component';
import { TrackTypesComponent } from './track_types/tracktypes.component';
import { ClientFormComponent } from './clients/form.component';

import {appRoutes} from './routing';
import {ProjectFormComponent} from "./projects/form.component";

@NgModule({
  declarations: [
    AppComponent, ClientsComponent, NotFoundComponent, ProjectsComponent, ProjectsTypesComponent,
    TrackerComponent, TrackTypesComponent, ClientFormComponent, ProjectFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    appRoutes,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
