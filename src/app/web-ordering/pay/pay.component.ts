import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { WebOrderingService } from '../web-ordering.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogForm } from './form-dialog/dialog.component';

@Component({
  selector: 'asha-success',
  standalone: true,
  imports: [
    WebOrderingBarComponent,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})
export class PayComponent {
  all_total: any
  img_qr: any;
  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
    private _service: WebOrderingService,
    private dialog: MatDialog
  ){
    this.all_total = this._service.get_sumPrice()
    this._service.paybyQR().subscribe({
      next:(resp: any)=> {
          console.log(resp);
          this.all_total = resp.total
          this.img_qr = resp.image
      },
    })
    this.LoopCheckPayment()
  }

  LoopCheckPayment(){
    this._service.check_statusQR().subscribe({
      next:(resp: any)=>{
        console.log('LoopCheckPayment resp:', resp);
        if(resp.orderStatus == 'complete')
          this.openLoading()
      }
    })
  }

  //checkPayment(){
  //  this._service.get_order().subscribe({
  //    next:(resp: any)=> {
  //      console.log(resp);
  //    }
  //  })
  //}

  openLoading(){
    const dialogRef = this.dialog.open(DialogForm, {
      disableClose: true,
      width: '138px',
      height: '138px',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
    });
    dialogRef.afterClosed().subscribe((result) => {
        this._router.navigate(['/payment/pay/success'])
    });
  }
}
