import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/user';
import { CommonModule, NgIf } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
  standalone: true,
  imports: [NgIf, CommonModule],
})
export class ProfilComponent implements OnInit {
  user?: User;
  apiUrl = environment.API_URL;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.readUser(id).subscribe((response: any) => {
        this.user = Array.isArray(response) ? response : response.data;
      });
    }
  }
}
