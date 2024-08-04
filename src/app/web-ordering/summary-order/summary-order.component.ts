import { Component } from '@angular/core';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WebOrderingService } from '../web-ordering.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'asha-summary-order',
  standalone: true,
  imports: [
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

  constructor(
    private _router: Router,
    public bottom: MatBottomSheet,
    private _service: WebOrderingService,
    private _fb: FormBuilder
  ){
    this.data = this._service.receiveOrder()
    this.nations = [
      { value: 'thai', name: 'ไทย'},
    ]
    console.log(this.data);
    this.form = this._fb.group({
      nation: '',
      sex: ''
    })
  }


}
