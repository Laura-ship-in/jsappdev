import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
  {
    path: 'prima-pagina',
    component: HomeComponent,
    data: {
      title: 'Home',
      description: 'prima-pagina',
    },
  },
  {
    path: 'secret',
    component: AdminComponent,
    data: {
      title: 'Admin',
      description: 'MyAdmin',
    },
  },
  {
    path: 'profil/:id',
    component: ProfilComponent,
    data: {
      title: 'Profil user',
      description: 'Profil user info',
    },
  },
  { path: '**', component: HomeComponent }, // Wildcard route for a 404 page
];
