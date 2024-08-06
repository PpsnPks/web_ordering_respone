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

@Component({
  selector: 'app-bottom-finish-job',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  promotion_selected: any = 0
  promotions: any

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<DeleteComponent>,
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
      this._bottomSheetRef.dismiss('');
    }

    close(){
      this._bottomSheetRef.dismiss('cancle');
    }
  
    submit() {
      this.toastrService.success('ลบบิลสำเร็จ', '', {positionClass: 'toast-top-center'})//{positionClass: 'toast-top-center'}
      this._bottomSheetRef.dismiss('confirm');
    }
}
