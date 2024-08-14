import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'asha-login',
  standalone: true,
  imports: [
    CommonModule,
    WebOrderingBarComponent,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  form: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService
  ){
    this.form = this._fb.group({
      room_No: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  next(){
    if (this.form.value.room_No != ''){
      sessionStorage.setItem('roomNo', this.form.value.room_No)
      this._router.navigate(['/home'])
    }
    else{
      this._toastr.error('กรุณาระบุเลขห้อง')
    }
  }
}
