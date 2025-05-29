import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [NgIf, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

descriere: string = ' Scurta descriere la Laurica Bombonica ' ;
myimg: string = 'https://i.imgur.com/4z7Zb1H.jpg';
showImage: boolean = true;

salut(){
  this.descriere = ' Laurica Bombonica ';
 }

 showImg(){
  this.showImage = !this.showImage;
 }
}