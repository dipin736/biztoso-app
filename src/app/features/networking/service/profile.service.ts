import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/profiles'; 

  constructor(private http: HttpClient) {}


  getProfiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  createProfile(profile: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, profile);
  }


  updateProfile(id: number, profile: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, profile);
  }


  deleteProfile(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
