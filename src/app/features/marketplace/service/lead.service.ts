import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiUrl = 'http://localhost:3000/leads';

  constructor(private http: HttpClient) {}

  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiUrl);
  }

  updateLead(lead: Lead): Observable<Lead> {
    return this.http.put<Lead>(`${this.apiUrl}/${lead.id}`, lead);
  }
  
}
