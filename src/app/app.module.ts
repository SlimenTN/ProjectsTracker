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
import {ProjectsTypeFormComponent} from "./projects_types/form.component";
import {InterventionsTypeFormComponent} from "./track_types/form.component";
import {InterventionFormComponent} from "./tracker/form.component";
import {MultiselectDropdownModule} from "angular-2-dropdown-multiselect";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginComponent} from "./authentication/login.component";
import {AuthenticationService} from "./authentication/authentication.service";
import {ContainerComponent} from "./container/container.component";

@NgModule({
  declarations: [
    AppComponent, ClientsComponent, NotFoundComponent, ProjectsComponent, ProjectsTypesComponent,
    TrackerComponent, TrackTypesComponent, ClientFormComponent, ProjectFormComponent, ProjectsTypeFormComponent,
    InterventionsTypeFormComponent, InterventionFormComponent, LoginComponent, ContainerComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    appRoutes,
    MultiselectDropdownModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
