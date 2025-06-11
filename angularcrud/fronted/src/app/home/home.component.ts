import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { User } from '../models/user';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  apiUrl = environment.API_URL;
  constructor(private title: Title, private apiService: ApiService) {}

  ngOnInit(): void {
    this.title.setTitle('Product Page - This is the product page');
    this.readUsers();
  }

  readUsers() {
    // read
    // this.apiService.readUsers().subscribe((users: User[]) => {
    //   this.users = users['users'];
    // });
    this.apiService.readUsers().subscribe((response: any) => {
      // Acceptă atât array direct cât și obiect cu data
      this.users = Array.isArray(response) ? response : response.data;
      //console.log('am utilizatori', JSON.stringify(this.users));
    });
  }
}
