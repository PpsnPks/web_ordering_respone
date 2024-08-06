import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebOrderingService } from '../web-ordering.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';

@Component({
  selector: 'asha-success',
  standalone: true,
  imports: [
    WebOrderingBarComponent,
    CommonModule,
    FormsModule,
    MatFormFieldModule
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  all_total: any

  constructor(
    private _router: Router,
    private _service: WebOrderingService
  ){
    this.all_total = this._service.get_sumPrice()
  }

  next(){
    this._router.navigate(['/home'])
  }

  print(){
    console.log('print');
    
  }

}
