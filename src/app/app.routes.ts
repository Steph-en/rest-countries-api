import { Routes } from '@angular/router';
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
        component: DetailsComponent,
        title: 'Details Page| Rest Countries API'
    }
];
