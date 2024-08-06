import { Order } from './../../modules/admin/report/compact.component';
import { Component, TemplateRef  } from '@angular/core';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WebOrderingService } from '../web-ordering.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { DiscountComponent } from './discount/discount.component';

@Component({
  selector: 'asha-summary-order',
  standalone: true,
  imports: [
    CommonModule,
    WebOrderingBarComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './summary-order.component.html',
  styleUrl: './summary-order.component.scss'
})
export class SummaryOrderComponent {
  data: any
  nations: any
  form: FormGroup
  orders: any
  num_order: any = 0
  sum_order: any = 4

  sum_price: any
  sum_discount: any
  sum_vat: any
  sum_service: any

  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
    private _service: WebOrderingService,
    private _fb: FormBuilder
  ){
    this.data = this._service.receiveOrder()
    this.nations = [
      { value: 'thai', name: 'ไทย'},
    ]
    console.log(this.data);
    this.form = this._fb.group({
      nation: '',
      sex: ''
    })
    this.orders = [
      {name: 'กาแฟสังขยา (CUSTARD COFFEE)', order: 1, add: [{name:'เพิ่มช็อตกาแฟ 1', type: 'shot'}], price: 65, type:'normal'},
      {name: 'Americano', order: 2, add: [{name: 'ขนาด M', type: 'size'}, {name: 'แถม โค้ก 1 ขวด', type: 'promotion'}], price: 85, type:'Pro'},
      {name: 'COCOA', order: 1, add: [{name:'ขนาด S', type: 'size'}, {name:'ส่วนลด 2.00 บาท', type: 'discount', discount: 2}], price: 60, type:'DC'},
    ]
    this.sum_all_price()
  }

  changeNumOrder(signal: any, item: any){
    if (signal == 'minus'){
      item.order -= 1
    }else if (signal == 'plus'){
      item.order += 1
    }
    this.sum_all_price()
  }

  next(){
    this._service.set_sumPrice(this.sum_price - this.sum_discount + this.sum_vat + this.sum_service)
    this._router.navigate(['/payment'])
  }

  sum_all_price(){
    this.sum_order = 0 
    this.sum_price = 0
    this.sum_discount = 0
    this.sum_vat = 0
    this.sum_service = 0
    for (let i = 0; i < this.orders.length; i++) {
      const element = this.orders[i];
      this.sum_order += element.order
      this.sum_price += (element.price * element.order)
      if(element?.type == 'DC'){
        for (let j = 0; j < element.add.length; j++) {
          const temp_data = element.add[j];
          if(temp_data?.discount){
            console.log('temp_data?.discount: ',temp_data.discount);
            this.sum_discount += temp_data.discount * element.order ?? ''
          }
        }
      }
      let temp_total = this.sum_price - this.sum_discount
      this.sum_vat = (temp_total*7.0) / 100.0
      this.sum_service = temp_total / 10.0
    }
  }
  //openAddProduct(item: any) {
  //  const bottomSheetAddProductRef = this.bottom.open(AddProductComponent, {
  //    data: item
  //  });
  //  bottomSheetAddProductRef.afterDismissed().subscribe((result) => {
  //    if (result === 'confirm') {
  //      item.order = item.order + 1
  //      console.log(item);
  //      this.summaryOrder()
  //    }
  //  });
  //}

  openDeleteBill(){
    const bottomSheetDeleteRef = this.bottom.open(DeleteComponent, {
      data: ''
    });
    bottomSheetDeleteRef.afterDismissed().subscribe((result) => {
      if (result === 'confirm') {
        this.orders = []
        this.sum_order = 0 
        this.sum_price = 0
        this.sum_discount = 0
        this.sum_vat = 0
        this.sum_service = 0
      }
    });
    
  }

  openDiscount(){
    const bottomSheetDiscountRef = this.bottom.open(DiscountComponent, {
      data: ''
    });
  }
}
