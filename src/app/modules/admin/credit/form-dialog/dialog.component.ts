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
import { CreditService } from '../credit.service';
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
        { id: 5, name: 'Manager '},
        { id: 3, name: 'Supervisor'},
        { id: 4, name: 'Cashier'},
     ];
     registerForm = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*,.?])(?=.*[a-z]).{8,}$')]),
      });
     
     
    constructor(
        private dialogRef: MatDialogRef<DialogForm>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        public _service: CreditService,
        private fuseConfirmationService: FuseConfirmationService,
        private userService: CreditService,
        private toastr: ToastrService,
       
    ) 
    {
        console.log(' this.form', this.data);
        if(this.data.type === 'EDIT') {
            this.form = this.FormBuilder.group({
                file: '',
                file_name: '',
             });
        } else {
            this.form = this.FormBuilder.group({
                file: '',
                file_name: '',
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
                        const formData = new FormData();
                        Object.entries(this.form.value).forEach(
                            ([key, value]: any[]) => {
                                if (value !== '' && value !== 'null' && value !== null) {
                                    formData.append(key, value);
                                  }
                            }
                        );
                        
                        this.userService.import(formData).subscribe({
                            error: (err) => {
                                this.toastr.error('ไม่สามารถบันทึกข้อมูลได้')
                            },
                            complete: () => {
                                this.toastr.success('ดำเนินการเพิ่มข้อมูลสำเร็จ')
                                this.dialogRef.close(true)
                            },
                        });
                    } else {
                        // this.userService.update(this.data.value.id ,formValue).subscribe({
                        //     error: (err) => {
                        //         this.toastr.error('ไม่สามารถบันทึกข้อมูลได้')
                        //     },
                        //     complete: () => {
                        //         this.toastr.success('ดำเนินการแก้ไขข้อมูลสำเร็จ')
                        //         this.dialogRef.close(true)
                        //     },
                        // });
                    }
                }
            }
        )
    }

    onClose() {
        this.dialogRef.close()
    }

    files: File[] = [];
    onSelect(event, input: any) {
      if (input === 'addfile') {
        this.form.patchValue({
          file: event[0],
          file_name: event[0].name,
        });
      }
    }
}
