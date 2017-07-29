import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { ClientFormComponent } from './clients/form.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsTypesComponent } from './projects_types/project-types.component';
import { TrackerComponent } from './tracker/tracker.component';
import { NotFoundComponent } from './not_found/not-found.component';
import { TrackTypesComponent } from './track_types/tracktypes.component';
import {ProjectFormComponent} from "./projects/form.component";

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/nouveau', component: ClientFormComponent },
  { path: 'clients/:id/modifier', component: ClientFormComponent },
  { path: 'projets', component: ProjectsComponent },
  { path: 'projets/nouveau', component: ProjectFormComponent },
  { path: 'projets/:id/modifier', component: ProjectFormComponent },
  { path: 'types-projets', component: ProjectsTypesComponent },
  { path: 'types-interventions', component: TrackTypesComponent },
  { path: 'traqueur', component: TrackerComponent },
  { path: '**', component: NotFoundComponent }
];

export const appRoutes = RouterModule.forRoot(routes);
