import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'asha-home',
  standalone: true,
  imports: [
    CommonModule,
    WebOrderingBarComponent,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selected: any = ''

  items: any
  constructor(
    private _router: Router
  ){
    this.items = [
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
      },
    ]
  }
}
