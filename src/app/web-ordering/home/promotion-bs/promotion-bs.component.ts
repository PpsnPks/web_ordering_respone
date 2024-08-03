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

@Component({
  selector: 'app-bottom-finish-job',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './promotion-bs.component.html',
  styleUrl: './promotion-bs.component.scss'
})
export class PromotionBsComponent {
  
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<PromotionBsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private router: Router,
    private toastrService: ToastrService
    ) {
      console.log(this.data);
      
    }

    goto() {
      this._bottomSheetRef.dismiss();
    }
  
    submit() {
      this.toastrService.success('บันทึกจบงานสำเร็จ', '', {positionClass: 'toast-top-center'})
      this._bottomSheetRef.dismiss();
    }
  
}
