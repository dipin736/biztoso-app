import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { LeadsComponent } from './components/leads/leads.component';
import { ListingsComponent } from './components/listings/listings.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    ListingsComponent,LeadsComponent
  ]
})
export class MarketplaceModule { }
