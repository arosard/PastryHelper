import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', pathMatch: 'full', loadComponent: () => import('./home/home').then(m => m.Home) },
    { path: 'fridge', loadComponent: () => import('./fridge/fridge').then(m => m.Fridge) },
];
