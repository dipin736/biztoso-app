import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'profile', component: ProfileFormComponent },
  { path: '', redirectTo: 'profile', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkingRoutingModule { }