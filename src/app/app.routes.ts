import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import("./pages/home/home.component").then((c) => c.HomeComponent),
        title: 'Home Page| Rest Countries API'
    },
    {
        path: 'details/:name',
        loadComponent: () => import("./pages/details/details.component").then((c) => c.DetailsComponent),
        title: 'Details Page| Rest Countries API'
    }
];
