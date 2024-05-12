import { Subscription } from 'rxjs';
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
import { UserService } from '../user.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ToastrService } from 'ngx-toastr';
import {MatRadioModule} from '@angular/material/radio';
@Component({
    selector: 'app-user-form',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    imports: [CommonModule, DataTablesModule, MatIconModule, MatFormFieldModule, MatInputModule,
        FormsModule, MatToolbarModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule
    ]
})
export class DialogForm implements OnInit {

    form: FormGroup;
    stores: any[]=[];
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    dtOptions: DataTables.Settings = {};
    addForm: FormGroup;   
    roles: any[] = [
        { id: 2, name: 'Admin'},
        { id: 3, name: 'Supervisor'},
        { id: 4, name: 'Cashier'},
     ];
    constructor(
        private dialogRef: MatDialogRef<DialogForm>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        public _service: UserService,
        private fuseConfirmationService: FuseConfirmationService,
        private userService: UserService,
        private toastr: ToastrService,
    ) 
    {
        console.log(' this.form', this.data);
        if(this.data.type === 'EDIT') {
            this.form = this.FormBuilder.group({
                code: this.data.value.code ?? '',
                firstName: this.data.value.firstName ?? '',
                lastName: this.data.value.lastName ?? '',
                phoneNumber: this.data.value.phoneNumber ?? '',
                roleId: this.data.value?.role?.id ?? '',
                username: this.data.value?.username ?? '',
                isActive: this.data.value?.isActive
           
             });
        } else {
            this.form = this.FormBuilder.group({
                code: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                roleId: '',
                username: '',
                password: '',
                confirmpassword: '',
             });
        }


        // console.log('1111',this.data?.type);
        
    }
    
    ngOnInit(): void {
         if (this.data.type === 'EDIT') {
        //   this.form.patchValue({
        //     ...this.data.value,
        //     roleId: +this.data.value?.role?.id
        //   })  
       
        } else {
            console.log('New');
        }
    }

    Submit() {
        let formValue = this.form.value
        const confirmation = this.fuseConfirmationService.open({
            title: "ยืนยันการบันทึกข้อมูล",
            icon: {
                show: true,
                name: "heroicons_outline:exclamation-triangle",
                color: "primary"
            },
            actions: {
                confirm: {
                    show: true,
                    label: "ยืนยัน",
                    color: "primary"
                },
                cancel: {
                    show: true,
                    label: "ยกเลิก"
                }
            },
            dismissible: false
        })

        confirmation.afterClosed().subscribe(
            result => {
                if (result == 'confirmed') {
                    if (this.data.type === 'NEW') {
                        this.userService.create(formValue).subscribe({
                            error: (err) => {
                                this.toastr.error('ไม่สามารถบันทึกข้อมูลได้')
                            },
                            complete: () => {
                                this.toastr.success('ดำเนินการเพิ่มข้อมูลสำเร็จ')
                                this.dialogRef.close(true)
                            },
                        });
                    } else {
                        this.userService.update(this.data.value.id ,formValue).subscribe({
                            error: (err) => {
                                this.toastr.error('ไม่สามารถบันทึกข้อมูลได้')
                            },
                            complete: () => {
                                this.toastr.success('ดำเนินการแก้ไขข้อมูลสำเร็จ')
                                this.dialogRef.close(true)
                            },
                        });
                    }
                }
            }
        )
    }

    onClose() {
        this.dialogRef.close()
    }

}
