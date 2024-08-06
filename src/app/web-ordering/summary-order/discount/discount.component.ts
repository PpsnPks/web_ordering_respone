import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-bottom-finish-job',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatRadioGroup,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss'
})
export class DiscountComponent {
  promotion_selected: any = 0
  promotions: any
  selectedDiscount: any = 0

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<DiscountComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private router: Router,
    private toastrService: ToastrService
    ) {
      console.log(this.data);
      this.promotions = [
        { name: 'On Top Promotions',  reduced: 'สินค้าลดเหลือ 100', type: 'Discount', startDate: '15/03/2025', endDate: '31/06/2025'},
        { name: 'Promotion Set',  reduced: 'สินค้าลดเหลือ 90', type: 'Gift', startDate: '01/11/2025', endDate: '31/12/2025'},
        { name: 'Promotion Set',  reduced: 'แถมโค้ก 1 ขวด', type: 'Gift', startDate: '01/12/2025', endDate: '31/01/2025'},
      ]
    }

    setPromotion(id: any){
      this.promotion_selected = id
      if (id == 0){
        this.promotions = [
          { name: 'On Top Promotions',  reduced: 'สินค้าลดเหลือ 100', type: 'Discount', startDate: '15/03/2025', endDate: '31/06/2025'},
          { name: 'Promotion Set',  reduced: 'สินค้าลดเหลือ 90', type: 'Gift', startDate: '01/11/2025', endDate: '31/12/2025'},
          { name: 'Promotion Set',  reduced: 'แถมโค้ก 1 ขวด', type: 'Gift', startDate: '01/12/2025', endDate: '31/01/2025'},
        ]
      }else if (id == 1){
        this.promotions = [
          { name: 'On Top Promotions',  reduced: 'สินค้าลดเหลือ 100', type: 'Discount', startDate: '15/03/2025', endDate: '31/06/2025'},
        ]
      }else if(id == 2){
        this.promotions = [
          { name: 'Promotion Set',  reduced: 'สินค้าลดเหลือ 90', type: 'Gift', startDate: '01/11/2025', endDate: '31/12/2025'},
          { name: 'Promotion Set',  reduced: 'แถมโค้ก 1 ขวด', type: 'Gift', startDate: '01/12/2025', endDate: '31/01/2025'},
        ]
      }
    }

    goto() {
      this._bottomSheetRef.dismiss();
    }

    close(){
      this._bottomSheetRef.dismiss();
    }
  
    submit() {
      this.toastrService.success('เลือกส่วนลดสำเร็จ', '', {positionClass: 'toast-top-center'})
      this._bottomSheetRef.dismiss();
    }
}
