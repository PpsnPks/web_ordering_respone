import { Subscription } from 'rxjs';
import { CustomersService } from './../customers/customers.service';
import { Component, OnInit, OnChanges, Inject } from '@angular/core';
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
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FuseConfirmationService } from '@fuse/services/confirmation';
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
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    dtOptions: DataTables.Settings = {};
    addForm: FormGroup;
    form: FormGroup;
    level: any[] = [
     
    ];

    constructor(
        private dialogRef: MatDialogRef<Dialogcustomer>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        public CustomersService: CustomersService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _service: CustomersService
    ) {
       this.addForm =this.FormBuilder.group({
        code: ['', Validators.required],
        name: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        address: [''],
        level: [''],
        taxId: [''],
        license_plate: [''],
       })
       this._service.getLevel().subscribe((resp: any)=>{
        this.level = resp
       })
    }

    ngOnInit(): void {
        if (this.data.type === 'Edit') {
            
          this.addForm.patchValue({
            ...this.data.value
          })  

        } else {
            console.log('New');
            
        }
    }
    Submit() {
        const confirmation = this._fuseConfirmationService.open({
            "title": "เพิ่มข้อมูล",
            "message": "คุณต้องการเพิ่มข้อมูลใช่หรือไม่ ",
            "icon": {
                "show": false,
                "name": "heroicons_outline:exclamation",
                "color": "warning"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "ยืนยัน",
                    "color": "primary"
                },
                "cancel": {
                    "show": true,
                    "label": "ยกเลิก"
                }
            },
            "dismissible": true
        });
        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                let formValue = this.addForm.value;
                this._service.create(formValue).subscribe({
                    next: (resp: any) => {
                        this.dialogRef.close(resp);
                    },
                    error: (err: any) => {
                        this.addForm.enable();
                        this._fuseConfirmationService.open({
                            "title": "กรุณาระบุข้อมูล",
                            "message": err.error.message,
                            "icon": {
                                "show": true,
                                "name": "heroicons_outline:exclamation",
                                "color": "warning"
                            },
                            "actions": {
                                "confirm": {
                                    "show": false,
                                    "label": "ยืนยัน",
                                    "color": "primary"
                                },
                                "cancel": {
                                    "show": false,
                                    "label": "ยกเลิก",
                                }
                            },
                            "dismissible": true
                        });
                    }
                })
            }
        })
    }

    onClose() {
        this.dialogRef.close()
    }
}
