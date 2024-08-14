import { Component } from '@angular/core';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WebOrderingService } from '../web-ordering.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'asha-payment',
  standalone: true,
  imports: [
    CommonModule,
    WebOrderingBarComponent,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  selected_payment: any = 2
  all_total: any
  status_order: any

  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
    private _service: WebOrderingService,
    private toastr: ToastrService
  ){
    this._service.get_order().subscribe({
      next:(resp: any)=> {
        console.log('grandTotal', resp.grandTotal);
        this.all_total = resp.grandTotal
        this.status_order = resp.orderStatus
      }
    })
    //this.all_total = this._service.get_sumPrice()
  }
  
  next(){
    if (this.status_order != 'complete'){
      if(this.selected_payment == 4){
        let formvalue = {
          paid: this.all_total,
          change: 0,
          discount: 0,
          serviceCharge: 0,
          serviceChargeRate: 0,
          orderPayments: [
            {
              paymentMethodId: 4,
              amount: this.all_total,
              remark: "test"
            }
          ]
        }
        this._service.selectPayment(formvalue).subscribe({
          next: (resp: any)=>{
            sessionStorage.setItem('orderPaymentId', resp.orderPayments[0].id)
            this._service.paidRoomService().subscribe({
              complete: ()=> {
                console.log('pay roomService complete')
                this._router.navigate(['/payment/pay/success'])
              },
              error: ()=> {
                console.log('pay roomService error')
                this.toastr.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
              }
            })
            console.log('selectPayment: service charge');
          }
        })
      } else if(this.selected_payment == 3) {
        let formvalue = {
          paid: this.all_total,
          change: 0,
          discount: 0,
          serviceCharge: 0,
          serviceChargeRate: 0,
          orderPayments: [
            {
              paymentMethodId: 1,
              amount: this.all_total,
              remark: "ชำระภายหลัง"
            }
          ]
        }
        this._service.selectPayment(formvalue).subscribe({
          next: (resp: any)=>{
            console.log('selectPayment', resp.orderPayments[0].id);
            
            sessionStorage.setItem('orderPaymentId', resp.orderPayments[0].id)
            this._service.paylater().subscribe({
              complete: ()=> {
                console.log('pay later complete')
                this._router.navigate(['/payment/pay/success'])
              },
              error: ()=> {
                console.log('pay later error')
                this.toastr.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
              }
            })
            console.log('selectPayment: pay later');
          }
        })
      } else if(this.selected_payment == 2) {
        let formvalue = {
          paid: this.all_total,
          change: 0,
          discount: 0,
          serviceCharge: 0,
          serviceChargeRate: 0,
          orderPayments: [
            {
              paymentMethodId: 2,
              amount: this.all_total,
              remark: "คิวอาร์โค้ด"
            }
          ]
        }
        this._service.selectPayment(formvalue).subscribe({
          next: (resp: any)=>{
            console.log('selectPayment', resp.orderPayments[0].id);
            sessionStorage.setItem('orderPaymentId', resp.orderPayments[0].id)
            console.log('selectPayment: QR Code');
            this._router.navigate(['/payment/pay'])
          }
        })
      }
    }
    else {
      this.toastr.error('คำสั่งซื้อรายการนี้มีการชำระเงินแล้ว')
    }
  }

  selectPayment(data: any){
    if(this.selected_payment == data){
      this.selected_payment = 0
    }
    else{
      this.selected_payment = data
    }
  }
}
