import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'networking', loadChildren: () => import('./features/networking/networking.module').then(m => m.NetworkingModule) },
    { path: 'marketplace', loadChildren: () => import('./features/marketplace/marketplace.module').then(m => m.MarketplaceModule) },
    { path: '', redirectTo: '/networking', pathMatch: 'full' },
  ];