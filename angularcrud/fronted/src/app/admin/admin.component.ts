import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { User } from './../models/user';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-admin',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  apiUrl = environment.API_URL;
  users: any[] = [];
  widthImg: number = 150;
  selectedUser: User = {
    id: 0,
    nume: '',
    prenume: '',
    email: '',
    datanastere: new Date(),
    telefon: '',
    poza: '',
  };
  selectedFile?: File;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.readUsers();
  }
  readUsers() {
    // read
    this.apiService.readUsers().subscribe((response: any) => {
      // Acceptă atât array direct cât și obiect cu data
      this.users = Array.isArray(response) ? response : response.data;
      console.log('am utilizatori', JSON.stringify(this.users));
    });
  }

  // Removed duplicate implementation of createOrUpdateUser

  createOrUpdateUser(form: { value: User }) {
    const formData = new FormData();
    formData.append('nume', this.selectedUser.nume);
    formData.append('prenume', this.selectedUser.prenume);
    formData.append('email', this.selectedUser.email);
    formData.append('telefon', this.selectedUser.telefon);
    formData.append('id', this.selectedUser.id.toString());
      formData.append('datanastere', this.selectedUser.datanastere?.toString() || ''
    );
    if (this.selectedFile) {
      formData.append('poza', this.selectedFile);
    }
    // Pentru update, adaugă și id-ul dacă e cazul

    if (this.selectedUser && this.selectedUser.id) {
      this.apiService
        .updateUser(this.selectedUser.id, formData)
        .subscribe((user: User) => {
          this.readUsers();
        });
    } else {
      this.apiService.createUser(formData).subscribe((user: User) => {
        console.log('User updated', user);
      });
    }
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  deleteUser(id: number) {
    this.apiService.deleteUser(id).subscribe((user: User) => {
      this.readUsers();
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
