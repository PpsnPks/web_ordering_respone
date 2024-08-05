import { Component } from '@angular/core';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WebOrderingService } from '../web-ordering.service';

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
  
  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
    private _service: WebOrderingService
  ){}
  
  next(){
    this._router.navigate(['/payment/pay'])
  }
}
