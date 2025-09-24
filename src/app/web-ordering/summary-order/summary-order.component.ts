import { Order } from './../../modules/admin/report/compact.component';
import { Component, TemplateRef  } from '@angular/core';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { WebOrderingService } from '../web-ordering.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { DiscountComponent } from './discount/discount.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';

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
  payerType: any = 'normal'
  orders: any
  num_order: any = 0
  sum_order: any = 4

  sum_price: any
  sum_discount: any
  sum_vat: any
  sum_service: any

  status_order: any

  bottomRef?: MatBottomSheetRef
  dialogRef?: MatDialogRef<any>

  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private _service: WebOrderingService,
    private _fb: FormBuilder,
    private toastr: ToastrService,

  ){
    console.log('start')
    // this.data = this._service.receiveOrder()
    this.nations = [
      { value: 'thai', name: 'ไทย'},
    ]
    this.form = this._fb.group({
      nation: '',
      sex: ''
    })
    this.orders = []
    //this.orders = [
    //  {name: 'กาแฟสังขยา (CUSTARD COFFEE)', order: 1, add: [{name:'เพิ่มช็อตกาแฟ 1', type: 'shot'}], price: 65, type:'normal'},
    //  {name: 'Americano', order: 2, add: [{name: 'ขนาด M', type: 'size'}, {name: 'แถม โค้ก 1 ขวด', type: 'promotion'}], price: 85, type:'Pro'},
    //  {name: 'COCOA', order: 1, add: [{name:'ขนาด S', type: 'size'}, {name:'ส่วนลด 2.00 บาท', type: 'discount', discount: 2}], price: 60, type:'DC'},
    //]

    console.log('start')
    this._service.receiveOrder().subscribe({
      next:(resp: any)=> {
        console.log('SSS',resp);
        this.status_order = 'waiting'
        console.log('k1',resp.orderItems.length);
        this.sum_order = resp.orderItems.length
        console.log('k2');
        this.sum_price = +resp.total
        console.log('k3');
        this.sum_discount = resp.discount ?? 0
        console.log('k4');
        this.sum_vat = resp.vat ?? 0
        console.log('k5');
        this.sum_service = +resp.serviceCharge
        console.log('k6');
        //useReal resp?.data?.length but temp = resp?.orderItems?.length 
        for (let i = 0; i < resp?.orderItems?.length ; i++) {
          const order = resp.orderItems[i];
          console.log('i = ',i , order.price + (order.attributes ?? []).reduce((sum,item)=> sum + item.total, 0))
          let temp_order = {
            product_id: order.productId, //useReal order.product_id
            name: order.name,
            order: order.quantity, //useReal order.order,
            price: order.price + (order.attributes ?? []).reduce((sum,item)=> sum + item.total, 0),
            //useReal price: order.product.price + order.attributes?.reduce((sum,item)=> sum + item.total, 0),
            type: 'normal',
            add: order.attributes
          }
          console.log('order',  order);
          console.log('temp_order',  temp_order);
          console.log('order.add',  temp_order.add);
          this.orders.push(temp_order)

        }
        //this.sum_all_price()
          console.log('orders',  this.orders);
      }
    })
    console.log('end')
    //useReal
    // this._service.get_order().subscribe({
    //   next:(resp: any)=> {
    //     this.status_order = resp.orderStatus
    //     this.sum_order = resp.orderItems.length
    //     this.sum_price = resp.total
    //     this.sum_discount = resp.discount ?? 0
    //     this.sum_vat = resp.vat ?? 0
    //     this.sum_service = resp.serviceCharge ?? 0
    //     for (let i = 0; i < resp?.orderItems?.length; i++) {
    //       const order = resp.orderItems[i];
    //       let temp_order = {
    //         product_id: order.product.id,
    //         name: order.product.name,
    //         order: order.quantity,
    //         price: order.product.price + order.attributes?.reduce((sum,item)=> sum + item.total, 0),
    //         type: 'normal',
    //         add: order.attributes
    //       }
    //       console.log('order.add',  temp_order.add);
    //       this.orders.push(temp_order)
    //     }
    //     //this.sum_all_price()
    //   }
    // })
  }

  changeNumOrder(signal: any, item: any){
    if (signal == 'minus'){
      item.order -= 1
    }else if (signal == 'plus'){
      item.order += 1
    }
    this.sum_all_price()
  }

  nextTemp(){
    let formvalue = [...this.orders]
    this._service.sendSumOrder(formvalue)
    this._router.navigate(['/payment/pay/success'])
  }

  next(){
    this._service.set_sumPrice(this.sum_price - this.sum_discount + this.sum_vat + this.sum_service)
    if (this.status_order != 'complete'){
      let roomNo = sessionStorage.getItem('roomNo')
      let temp_order = []
      for (let i = 0; i < this.orders.length; i++) {
        const element = this.orders[i];
        if (element.order > 0){
          let temp_data = {
            productId: element.product_id,
            price: element.price,
            quantity: element.order,
            total: element.price * element.order,
            attributes: element.add
          }
          temp_order.push(temp_data)
        }
      }
      let formvalue = {
        grandtotal:this.sum_price - this.sum_discount + this.sum_vat + this.sum_service,
        total: this.sum_price,
        deviceId: 1,
        roomNo: roomNo,
        orderItems: temp_order,
        remark: '',
        serviceCharge: this.sum_service
      }
      this._service.edit_order(formvalue).subscribe({
        complete: ()=> {
        },
        error: ()=> this.toastr.error("error")
      })
      this._router.navigate(['/payment/pay/success'])
    } else {
      this.toastr.error('คำสั่งซื้อรายการนี้มีการชำระเงินแล้ว')
    }
  }

  changePayer(data: any){
    this.payerType = data
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
            this.sum_discount += (temp_data.discount * element.order) || 0
          }
        }
      }

      //let temp_total = this.sum_price - this.sum_discount

      //this.sum_vat = (temp_total*7.0) / 100.0 //คำนวณ vat
      this.sum_service = this.sum_price / 10.0 //คำนวณ Service Charge 10%
    }
  }
  //openAddProduct(item: any) {
  //  const bottomSheetAddProductRef = this.bottom.open(AddProductComponent, {
  //    data: item
  //  });
  //  bottomSheetAddProductRef.afterDismissed().subscribe((result) => {
  //    if (result === 'confirm') {
  //      item.order = item.order + 1
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
    const breakref = this.breakpointObserver.observe(['(orientation: portrait)']).subscribe((result)=>{
      if (result.matches){
        if(this.dialogRef)
          this.dialogRef.close('change')
        this.bottomRef = this.bottom.open(DiscountComponent, {
          data: ''
        });
        this.bottomRef.afterDismissed().subscribe((result) => {
          this.bottomRef = undefined; // จำเป็น → เคลียร์ค่าเมื่อปิด dialog แล้ว
          if(result !== 'change'){
              this.dialogRef = undefined; // จำเป็น → เคลียร์ค่าเมื่อปิด dialog แล้ว
              if (this.breakpointObserver) {
                  breakref.unsubscribe();
                  // this.breakpointObserver = undefined;
              }
          }
        });
      } else {
        if(this.bottomRef)
          this.bottomRef.dismiss('change')
        this.dialogRef = this.dialog.open(DiscountComponent, {
          data: '',
          width: '600px'
        });
        this.dialogRef.afterClosed().subscribe((result) => {
            this.dialogRef = undefined; // จำเป็น → เคลียร์ค่าเมื่อปิด dialog แล้ว
            if(result !== 'change'){
                console.log('QQQQQQQQQQQQ');
                
                this.bottomRef = undefined; // จำเป็น → เคลียร์ค่าเมื่อปิด dialog แล้ว
                if (this.breakpointObserver) {
                    breakref.unsubscribe();
                    // this.breakpointObserver = undefined;
                }
            }
        });
      }
    })
    // const bottomSheetDiscountRef = this.bottom.open(DiscountComponent, {
    //   data: ''
    // });
  }
}
