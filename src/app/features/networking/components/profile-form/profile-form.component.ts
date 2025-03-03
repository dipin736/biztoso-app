import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../service/profile.service';
import { MatTableModule } from '@angular/material/table'; 
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-profile-form',
  standalone: true, 
  imports: [FormsModule, MatCardModule, MatInputModule,CommonModule,ReactiveFormsModule,MatTableModule,MatIcon],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent {
  profileForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  profiles: any[] = [];
  editing: boolean = false;
  editingId: number | null = null;
  previewMode: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private profileService: ProfileService
  ) {
 this.profileForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
  description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  logo: [null, Validators.required]
});

  }

  ngOnInit() {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe((profiles) => {
      this.profiles = profiles;
    });
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profileForm.patchValue({ logo: file });
      this.profileForm.get('logo')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  showPreview(): void {
    if (this.profileForm.valid) {
      this.previewMode = true; 
    } else {
      this.snackBar.open('Please fill all required fields!', 'Close', { duration: 3000 });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const profileData = { ...this.profileForm.value };

      if (this.imagePreview) {
        profileData.logo = this.imagePreview;
      }

      if (this.editing) {
        this.profileService.updateProfile(this.editingId!, profileData).subscribe(() => {
          this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
          this.resetForm();
        });
      } else {
        this.profileService.createProfile(profileData).subscribe(() => {
          this.snackBar.open('Profile saved successfully!', 'Close', { duration: 3000 });
          this.resetForm();
        });
      }
    }
  }

  editProfile(profile: any): void {
    this.profileForm.patchValue({
      name: profile.name,
      location: profile.location,
      description: profile.description,
      logo: profile.logo
    });
    this.imagePreview = profile.logo;
    this.editing = true;
    this.editingId = profile.id;
  }

  deleteProfile(id: number): void {
    this.profileService.deleteProfile(id).subscribe(() => {
      this.snackBar.open('Profile deleted successfully!', 'Close', { duration: 3000 });
      this.loadProfiles();
    });
  }

  resetForm(): void {
    this.profileForm.reset();
    this.imagePreview = null;
    this.editing = false;
    this.editingId = null;
    this.previewMode = false;
    this.loadProfiles();
  }
}
