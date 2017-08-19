import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { ClientFormComponent } from './clients/form.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsTypesComponent } from './projects_types/project-types.component';
import { TrackerComponent } from './tracker/tracker.component';
import { NotFoundComponent } from './not_found/not-found.component';
import { TrackTypesComponent } from './track_types/tracktypes.component';
import {ProjectFormComponent} from "./projects/form.component";
import {ProjectsTypeFormComponent} from "./projects_types/form.component";
import {InterventionsTypeFormComponent} from "./track_types/form.component";
import {InterventionFormComponent} from "./tracker/form.component";
import {LoginComponent} from "./authentication/login.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/nouveau', component: ClientFormComponent },
  { path: 'clients/:id/modifier', component: ClientFormComponent },
  { path: 'projets', component: ProjectsComponent },
  { path: 'projets/nouveau', component: ProjectFormComponent },
  { path: 'projets/:id/modifier', component: ProjectFormComponent },
  { path: 'types-projets', component: ProjectsTypesComponent },
  { path: 'types-projets/nouveau', component: ProjectsTypeFormComponent },
  { path: 'types-projets/:id/modifier', component: ProjectsTypeFormComponent },
  { path: 'types-interventions', component: TrackTypesComponent },
  { path: 'types-interventions/nouveau', component: InterventionsTypeFormComponent },
  { path: 'types-interventions/:id/modifier', component: InterventionsTypeFormComponent },
  { path: 'traqueur', component: TrackerComponent },
  { path: 'traqueur/nouveau', component: InterventionFormComponent },
  { path: 'traqueur/:id/modifier', component: InterventionFormComponent },
  { path: '**', component: NotFoundComponent }
];

export const appRoutes = RouterModule.forRoot(routes);
