import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkingRoutingModule } from './networking-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NetworkingRoutingModule,
    ChatComponent,ProfileFormComponent
  ],
  
})
export class NetworkingModule { }
