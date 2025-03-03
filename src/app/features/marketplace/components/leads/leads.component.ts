import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeadService,Lead } from '../../service/lead.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';



@Component({
  selector: 'app-leads',
  imports: [CommonModule,MatTableModule,FormsModule,HighlightDirective],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css'
})
export class LeadsComponent {

  leads: Lead[] = [];
  filteredLeads: Lead[] = [];
  statusFilter: string = 'all';

  constructor(private leadService: LeadService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchLeads();
  }

  fetchLeads(): void {
    this.leadService.getLeads().subscribe((leads) => {
      this.leads = leads;
      this.filteredLeads = leads;
    });
  }

  filterLeads(status: string): void {
    this.statusFilter = status;
    this.filteredLeads = status === 'all' ? this.leads : this.leads.filter(lead => lead.status === status);
  }

  claimLead(lead: Lead): void {
    const updatedLead = { ...lead, status: 'claimed' }; 
  
    this.leadService.updateLead(updatedLead).subscribe((response) => {
      if (response) {
        this.snackBar.open(`Lead "${lead.name}" claimed!`, 'Close', { duration: 3000 });
  
        this.leads = this.leads.map(l => l.id === lead.id ? updatedLead : l);
  
        this.filterLeads(this.statusFilter);
      }
    }, error => {
      console.error('Error updating lead:', error);
      this.snackBar.open('Failed to claim lead. Try again.', 'Close', { duration: 3000 });
    });
  }
  

  trackByLeadId(index: number, lead: Lead): number {
    return lead.id;
  }
}