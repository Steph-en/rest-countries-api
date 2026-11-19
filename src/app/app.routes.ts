import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page | Rest Countries API'
    },
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'details/:name',
        component: DetailsComponent,
        title: 'Details Page | Rest Countries API'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
