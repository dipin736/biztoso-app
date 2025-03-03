import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Listing {
  id?: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private apiUrl = 'http://localhost:3000/listings';

  constructor(private http: HttpClient) {}

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.apiUrl);
  }

  addListing(listing: Listing): Observable<Listing> {
    return this.http.post<Listing>(this.apiUrl, listing);
  }

  updateListing(listing: Listing): Observable<Listing> {
    return this.http.put<Listing>(`${this.apiUrl}/${listing.id}`, listing);
  }

  deleteListing(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
