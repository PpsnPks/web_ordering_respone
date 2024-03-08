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
import { BranchService } from '../branch/branch.service';
@Component({
    selector: 'app-matching-list',
    standalone: true,
    templateUrl: './dialogb.component.html',
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
export class Dialogbranch implements OnInit {

    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<Dialogbranch>,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        public BranchService: BranchService,
    ) {
        ({});
    }
    dtOptions: DataTables.Settings = {};


    ngOnInit(): void {
        // console.log(this.FormBuilder)
        this.form = this.FormBuilder.group({
            code:'',
            name:'',
            storeId:'',
            address:''
        })
    }
    Submit() {
        console.log(this.form.value.code)
        this.BranchService.create({
            code: this.form.value.code,
            name: this.form.value.name,
            storeId: this.form.value.storeId,
            address: this.form.value.address,

            //ดึงข้อมูลมาใช้งาน
        }).subscribe(
            {
                next: (resp: any) => {
                    this.dialogRef.close()
                }
            }
        )

    }
    databranch =
        {
            "id": 1,
            "code": "ASAP001",
            "name": "อาลาดิน ดูเยน ",
            "storeId": 1,
            "address": "kampongBenaeklupea",
        }
    // shop
    storeIds = [
        { "id": 1, "name": "nidashop" },
        { "id": 1, "name": "nanajitangshop" },
        { "id": 1, "name": "stabuck" },
        { "id": 1, "name": "kfc" },
        { "id": 1, "name": "OreoStore" },
        { "id": 1, "name": "Mackdunald" },
        { "id": 1, "name": "cocacocastick" },
        { "id": 1, "name": "vainnasuper" },
        { "id": 1, "name": "yangkongmodify" },
        { "id": 1, "name": "diythailand" }
    ]

}
