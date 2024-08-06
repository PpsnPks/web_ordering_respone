import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PromotionBsComponent } from './promotion-bs/promotion-bs.component';
import { AddProductComponent } from './add-product/add-product.component';
import localeTh from '@angular/common/locales/th';
import { WebOrderingService } from '../web-ordering.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeTh);
@Component({
  selector: 'asha-home',
  standalone: true,
  providers: [
    { provide: LOCALE_ID, useValue: 'th-TH' } // ตั้งค่า locale ให้เป็น 'th-TH'
  ],
  imports: [
    CommonModule,
    WebOrderingBarComponent,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatBottomSheetModule,
    DecimalPipe,
    MatIconModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  selected: any = ''
  items: any
  all_order: any = 0
  all_price: any = 0

  filterSearch: any = 'filter'
  text_search: any = ''
  
  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
    private _service: WebOrderingService
  ){
    this.items = [
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
        order: 0
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
        order: 0
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
        order: 0
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
        order: 0
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
        order: 0
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
        order: 0
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
        order: 0
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
        order: 0
      },
      {
        product_img: "../../../assets/ordering/mock_img.png",
        product_name: "Matcha Latte",
        product_price: "85.00",
        order: 0
      },
    ]
  }

  resetText_search(){
    this.text_search = ''
    console.log('resetText_search');
    
  }

  set_filterSearch(data: any){
    this.filterSearch = data
    console.log("filterSearch: ", this.filterSearch);
  }

  summaryOrder(){
    let temp_order = 0
    let temp_price = 0
    for(let item of this.items){
      temp_order += item.order
      temp_price += parseInt(item.product_price) * item.order
    }
    this.all_order = temp_order
    this.all_price = temp_price
  }

  openAddProduct(item: any) {
    const bottomSheetAddProductRef = this.bottom.open(AddProductComponent, {
      data: item
    });
    bottomSheetAddProductRef.afterDismissed().subscribe((result) => {
      if (result === 'confirm') {
        item.order = item.order + 1
        console.log(item);
        this.summaryOrder()
      }
    });
  }

  openPromotion(){
    const bottomSheePromotiontRef = this.bottom.open(PromotionBsComponent, {
      data: ''
    });
  }

  next(){
    let sum_order = []
    for(let item of this.items){
      if(item.order > 0)
        sum_order.push(item)
    }
    let all_data = {
      data: sum_order,
      num_order: this.all_order,
      sum_price: this.all_price
    }
    this._service.sendOrder(all_data)
    this._router.navigate(['/summary-order'])
  }
}
