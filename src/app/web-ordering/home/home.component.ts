import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { PromotionBsComponent } from './promotion-bs/promotion-bs.component';

@Component({
  selector: 'asha-home',
  standalone: true,
  imports: [
    CommonModule,
    WebOrderingBarComponent,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatBottomSheetModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selected: any = ''

  items: any
  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
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

  submit(item: any) {
    this.bottom.open(PromotionBsComponent, {
      data: item
    });
  }
}
