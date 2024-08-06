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
  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
    private _service: WebOrderingService,
    private dialog: MatDialog
  ){
    this.all_total = this._service.get_sumPrice()
  }

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
