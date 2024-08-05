import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { WebOrderingService } from '../web-ordering.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';

@Component({
  selector: 'asha-pay',
  standalone: true,
  imports: [
    WebOrderingBarComponent,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})
export class PayComponent {

  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
    private _service: WebOrderingService
  ){}

}
