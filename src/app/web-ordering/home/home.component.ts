import { ToastrService } from 'ngx-toastr';
import { categories } from './../../mock-api/apps/academy/data';
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
  items: any = []
  all_product = []
  all_items: any = []
  filter_items: any = []
  all_order: any = 0
  all_price: any = 0

  filterSearch: any = 'filter'
  text_search: any = ''
  categories: any // = [
  //  {name: "สินค้าทั้งหมด", id: ''},
  //  {name: "เครื่องดื่ม", id: 0},
  //  {name: "อาหาร", id: 1},
  //  {name: "โปรโมชั่น", id: 2},
  //]
  order_selected: any = []
  
  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
    private _service: WebOrderingService,
    private toastr: ToastrService
  ){
    //this.all_items = [
    //  {
    //    product_img: "../../../assets/ordering/mock_img.png",
    //    product_name: "Matcha Latte",
    //    product_price: "85.00",
    //    order: 0
    //  },
    //  {
    //    product_img: "../../../assets/ordering/mock_img.png",
    //    product_name: "Matcha Latte",
    //    product_price: "85.00",
    //    order: 0
    //  },
    //  {
    //    product_img: "../../../assets/ordering/mock_img.png",
    //    product_name: "Matcha Latte",
    //    product_price: "85.00",
    //    order: 0
    //  },
    //  {
    //    product_img: "../../../assets/ordering/mock_img.png",
    //    product_name: "Matcha Latte",
    //    product_price: "85.00",
    //    order: 0
    //  },
    //  {
    //    product_img: "../../../assets/ordering/mock_img.png",
    //    product_name: "Matcha Latte",
    //    product_price: "85.00",
    //    order: 0
    //  },
    //  {
    //    product_img: "../../../assets/ordering/mock_img.png",
    //    product_name: "Matcha Latte",
    //    product_price: "85.00",
    //    order: 0
    //  },
    //  {
    //    product_img: "../../../assets/ordering/mock_img.png",
    //    product_name: "Matcha Latte",
    //    product_price: "85.00",
    //    order: 0
    //  },
    //  {
    //    product_img: "../../../assets/ordering/mock_img.png",
    //    product_name: "Matcha Latte",
    //    product_price: "85.00",
    //    order: 0
    //  },
    //  {
    //    product_img: "../../../assets/ordering/mock_img.png",
    //    product_name: "Matcha Latte",
    //    product_price: "85.00",
    //    order: 0
    //  },
    //]
    this._service.getCategory().subscribe({
      next:(resp: any)=> {
        this.categories = resp
      }
    })
    this.getProduct('')
  }

  getProduct(id: any){
    console.log('133', this.order_selected);
    
    this._service.get_product(id).subscribe({
      next:(resp: any)=> {
        let all = []
        console.log('AAA: ',resp)
        for (let i = 0; i < resp.length; i++) {
          const item = resp[i];
          let temp_data = {
            product_id : item.id,
            product_img : "../../../assets/ordering/mock_img.png",
            product_name : item.name,
            product_price : item.price,
            order : 0,
            attributes : item.productAttributes ?? null
          }
          all.push(temp_data)
        }
        for (let i = 0; i < this.order_selected.length; i++) {
          const element = this.order_selected[i];
          console.log('22',element);
          if (all.find(item=> item.product_id == element.product_id) != undefined)
            all.find(item=> item.product_id == element.product_id).order = element.order
        }
        //all.find
        this.all_items = all
        this.filter_items = all
      }
    })
  }

  resetText_search(){
    this.text_search = ''
    console.log('resetText_search');
    this.resetDataIn_filter()
  }

  set_filterSearch(data: any){
    this.filterSearch = data
    console.log("filterSearch: ", this.filterSearch);
    this.resetDataIn_filter()
    this.resetText_search()
  }

  categorieChange(data: any){
    this.getProduct(data)
    console.log('categorieChange', data);
  }

  summaryOrder(){
    let temp_order = 0
    let temp_price = 0
    for(let item of this.order_selected){
      temp_order += item.order
      temp_price += parseInt(item.product_price) * item.order
    }
    this.all_order = temp_order
    this.all_price = temp_price
  }

  resetDataIn_filter(){
    this.filter_items = this.all_items
  }

  openAddProduct(item: any) {
    if (item.attributes == null){
      //item.order = item.order + 1
      console.log(item.order-1,' = ',item.order);
      
      if (this.order_selected.find(order => order.product_id == item.product_id) === undefined){
        let temp = {
          product_id: item.product_id,
          product_price: item.product_price,
          order: 1,
          attributes: item.attributes
        }
        this.order_selected.push(temp)
        this.filter_items.find(order => order.product_id == item.product_id).order = 1
      } else {
        //if (this.order_selected === this.filter_items || this.order_selected === this.all_items ){
        //  this.order_selected.find(order => order.product_id == item.product_id).order += 1
        //}else{
          this.order_selected.find(order => order.product_id == item.product_id).order += 1
          this.filter_items.find(order => order.product_id == item.product_id).order += 1
        //}
        console.log('I can find IT ',this.order_selected);
      }
      console.log('44: ', this.order_selected.find(order => order.product_id == item.product_id));
      this.summaryOrder()
    } else {
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
  }

  openPromotion(){
    const bottomSheePromotiontRef = this.bottom.open(PromotionBsComponent, {
      data: ''
    });
  }

  next(){
    let sum_order = []
    for(let item of this.all_items){
      if(item.order > 0)
        sum_order.push(item)
    }
    let all_data = {
      data: sum_order,
      num_order: this.all_order,
      sum_price: this.all_price
    }
    this._service.sendOrder(all_data)
    this.add_order()
  }

  add_order(){
    let roomNo = sessionStorage.getItem('roomNo')
    let temp_order = []
    for (let i = 0; i < this.order_selected.length; i++) {
      const element = this.order_selected[i];
      if (element.order > 0){
        console.log('element', element);
        let temp_data = {
          productId: element.product_id,
          price: element.product_price,
          quantity: element.order,
          total: element.product_price * element.order,
          attributes: element.attributes
        }
        temp_order.push(temp_data)
      }
    }
    let formvalue = {
      total: this.all_price,
      deviceId: 2,
      roomNo: roomNo,
      orderItems: temp_order,
      remark: ''
    }
    this._service.add_order(formvalue).subscribe({
      next: (resp: any)=> {
        sessionStorage.setItem('orderId', resp.id)
        this._router.navigate(['/summary-order'])
      },
      error: ()=> this.toastr.error("error")
    })
  }

  search_itemName(event: Event){
    const inputElement = event.target as HTMLInputElement
    const find_data = inputElement.value
    if (find_data != ''){
      this.filter_items = this.all_items.filter(item => item.product_name && item.product_name.toLowerCase().includes(find_data.toLowerCase()))
    } else {
      this.filter_items = this.all_items
    }
  }
}
