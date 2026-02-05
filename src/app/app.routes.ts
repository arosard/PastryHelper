import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },
    { path: 'fridge', loadComponent: () => import('./fridge/fridge').then(m => m.Fridge) },
    { path: 'categories', loadComponent: () => import('./category-manager/category-manager').then(m => m.CategoryManager) },
];
