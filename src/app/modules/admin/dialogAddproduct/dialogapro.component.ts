import { AddProductService } from './../AddProduct/AddProduct.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
    MatDialog,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-dialogapro',
    standalone: true,
    templateUrl: './dialogapro.component.html',
    styleUrl: './dialogapro.component.scss',
    imports: [CommonModule, DataTablesModule, MatIconModule, MatFormFieldModule, MatInputModule,
        FormsModule, MatToolbarModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose, MatSelectModule,
        ReactiveFormsModule]
})
export class dialogapro implements OnInit {

    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<dialogapro>,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        public AddProductService: AddProductService,
    ) {
        ({});
    }
    dtOptions: DataTables.Settings = {};


    ngOnInit(): void {
        // console.log(this.FormBuilder)
        this.form = this.FormBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            price: ['', Validators.required],
            details: ['',],
        })
    }
    Submit() {
        console.log(this.form.value.code)
        this.AddProductService.create({
            code: this.form.value.code,
            name: this.form.value.name,
            price: this.form.value.price,
            details: this.form.value.details,

            //ดึงข้อมูลมาใช้งาน
        }).subscribe(
            {
                next: (resp: any) => {
                    this.dialogRef.close()
                }
            }
        )

    }
    dataAproduct =
        {
            "id": 1,
            "code": "ASAP001",
            "name": "อาลาดิน ดูเยน ",
            "price": "95",
            "details": "ขนมปังอบกรอปใส่ครีม",
        }

}
