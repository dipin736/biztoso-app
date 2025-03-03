import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule, RouterOutlet,MatToolbarModule,MatIconModule,RouterLink,MatButtonModule,RouterModule,MatMenuModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = ' Business Management Platform';
  navLinks = [
    {
      label: 'Networking',
      icon: 'people',
      children: [
        { path: '/networking/profile', label: 'Profile' },
        { path: '/networking/chat', label: 'Chat' }
      ]
    },
    {
      label: 'Marketplace',
      icon: 'store',
      children: [
        { path: '/marketplace/leads', label: 'Leads' },
        { path: '/marketplace/listings', label: 'Listings' }
      ]
    },
  ];
}