import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsTypesComponent } from './projects_types/project-types.component';
import { TrackerComponent } from './tracker/tracker.component';
import { NotFoundComponent } from './not_found/not-found.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'projets', component: ProjectsComponent },
  { path: 'types-projets', component: ProjectsTypesComponent },
  { path: 'traqueur', component: TrackerComponent },
  { path: '**', component: NotFoundComponent }
];

export const appRoutes = RouterModule.forRoot(routes);
