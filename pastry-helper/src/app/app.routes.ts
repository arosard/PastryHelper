import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'fridge', pathMatch: 'full' },
    { path: 'fridge', loadComponent: () => import('./fridge/fridge').then(m => m.Fridge) },
];
