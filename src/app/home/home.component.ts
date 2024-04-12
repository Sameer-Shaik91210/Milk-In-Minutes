import { Component, OnInit } from '@angular/core';
import { DairyService } from '../services/dairy.service';
import { dairyProduct } from '../models/dairyProduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
}
