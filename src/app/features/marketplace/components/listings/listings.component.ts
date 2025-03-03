import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Listing, ListingsService } from '../../service/listings.service';
import { MatListModule } from '@angular/material/list'; 
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,MatListModule,MatTableModule
  ],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
})
export class ListingsComponent {
  listingForm: FormGroup;
  imagePreviews: string[] = [];
  selectedListing: Listing | null = null;
  listings: Listing[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private listingsService: ListingsService
  ) {
    this.listingForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      images: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchListings();
  }

  fetchListings(): void {
    this.listingsService.getListings().subscribe((data) => {
      this.listings = data;
    });
  }

  onImageUpload(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const fileArray = Array.from(files);
      this.listingForm.patchValue({ images: fileArray });

      this.imagePreviews = [];
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => this.imagePreviews.push(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    }
  }

  onSubmit(): void {
    if (this.listingForm.valid) {
      const formValue = this.listingForm.value;
      const newListing: Listing = {
        id: this.selectedListing ? this.selectedListing.id : undefined,
        title: formValue.title,
        description: formValue.description,
        price: parseFloat(formValue.price),
        images: this.imagePreviews,
      };

      if (this.selectedListing) {
        this.listingsService.updateListing(newListing).subscribe(() => {
          this.snackBar.open('Listing updated successfully!', 'Close', { duration: 3000 });
          this.fetchListings();
          this.resetForm();
        });
      } else {
        this.listingsService.addListing(newListing).subscribe(() => {
          this.snackBar.open('Listing created successfully!', 'Close', { duration: 3000 });
          this.fetchListings();
          this.resetForm();
        });
      }
    }
  }

  editListing(listing: Listing): void {
    this.selectedListing = listing;
    this.listingForm.patchValue({
      title: listing.title,
      description: listing.description,
      price: listing.price.toString(),
      images: listing.images,
    });
    this.imagePreviews = listing.images;
  }

  deleteListing(id: number): void {
    this.listingsService.deleteListing(id).subscribe(() => {
      this.snackBar.open('Listing deleted successfully!', 'Close', { duration: 3000 });
      this.fetchListings();
    });
  }

  resetForm(): void {
    this.listingForm.reset();
    this.imagePreviews = [];
    this.selectedListing = null;
  }
}