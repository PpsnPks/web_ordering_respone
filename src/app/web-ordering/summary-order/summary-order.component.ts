import { Component } from '@angular/core';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WebOrderingService } from '../web-ordering.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
      {name: 'COCOA', order: 1, add: [{name:'ขนาด S', type: 'size'}, {name:'ส่วนลด 2.00 บาท', type: 'discount'}], price: 60, type:'DC'},
    ]
  }

  changeNumOrder(signal: any, item: any){
    if (signal == 'minus'){
      item.order -= 1
    }else if (signal == 'plus'){
      item.order += 1
    }
  }

  next(){
    
  }
}
