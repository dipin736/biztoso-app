import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './components/leads/leads.component';
import { ListingsComponent } from './components/listings/listings.component';

const routes: Routes = [
  { path: 'leads', component: LeadsComponent }, 
  { path: 'listings', component: ListingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
