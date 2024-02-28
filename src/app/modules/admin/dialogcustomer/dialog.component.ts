import { Subscription } from 'rxjs';
import { CustomersService } from './../customers/customers.service';
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
    selector: 'app-matching-list',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    imports: [CommonModule, DataTablesModule, MatIconModule, MatFormFieldModule, MatInputModule,
        FormsModule, MatToolbarModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose, MatSelectModule,
        ReactiveFormsModule]
})
export class Dialogcustomer implements OnInit {

    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<Dialogcustomer>,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        public CustomersService: CustomersService
    ) {
        ({});
    }
    dtOptions: DataTables.Settings = {};


    ngOnInit(): void {
        // console.log(this.FormBuilder)
        this.form = this.FormBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
        })

    }
    Submit() {
        console.log(this.form.value.code)
        this.CustomersService.create({
            code: this.form.value.code,
            name: this.form.value.name,
            address: this.form.value.address,
            phoneNumber: this.form.value.phoneNumber
            //ดึงข้อมูลมาใช้งาน
        }).subscribe(
            {
                next: (resp: any) => {
                    this.dialogRef.close()
                }
            }
        )

    }
    datacustomer1 =
        {
            "id": 1,
            "code": "ASAP001",
            "name": "อาลาดิน ดูเยน ",
            "phone": "095-874-0032",
            "address": "095-874-0032",
        }

}
