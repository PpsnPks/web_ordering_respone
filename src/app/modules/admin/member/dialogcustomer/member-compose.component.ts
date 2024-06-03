import { Component, OnInit, Inject } from '@angular/core';
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
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ToastrService } from 'ngx-toastr';
import { MatRadioModule } from '@angular/material/radio';
import { MemberService } from '../member.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
@Component({
    selector: 'app-member-compose',
    standalone: true,
    templateUrl: './member-compose.component.html',
    styleUrl: './member-compose.component.scss',
    imports: [
        CommonModule,
        DataTablesModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatDatepickerModule
    ]
})
export class MemberComposeComponent implements OnInit {

    form: FormGroup;
    stores: any[] = [];
    category: any[] = [
        'A',
        'B',
        'C',
        'D',
    ];
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    dtOptions: DataTables.Settings = {};
    addForm: FormGroup;
    constructor(
        private dialogRef: MatDialogRef<MemberComposeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        public _service: MemberService,
        private fuseConfirmationService: FuseConfirmationService,
        private toastr: ToastrService,
    ) {
        if (this.data.type === 'EDIT') {
            this.form = this.FormBuilder.group({
                code: this.data.value.code ?? '',
                firstname: this.data.value.firstname ?? '',
                lastname: this.data.value.lastname ?? '',
                active: this.data.value.active,
                cardSN: this.data.value.card?.sn ?? '',
                cardType: this.data.value.card?.cardType ?? '',
                activeDate: this.data.value.card?.activeDate ?? '',
            });
        } else {
            this.form = this.FormBuilder.group({
                code: '',
                firstname: '',
                lastname: '',
                active: '',
                cardSN: '',
                cardType: '',
                activeDate: '',
            });
        }

    }

    ngOnInit(): void {
        if (this.data.type === 'EDIT') {
        } else {
        }
    }

    Submit() {
        let formValue = this.form.value
        formValue.activeDate = DateTime.fromISO(formValue.activeDate).toFormat('yyyy-MM-dd');
        console.log('EDIT', formValue)
        return;
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
                        this._service.create(formValue).subscribe({
                            error: (err) => {
                                this.fuseConfirmationService.open({
                                    title: 'กรุณาตรวจสอบข้อมูล',
                                    message: err.error.message,
                                    icon: {
                                        show: true,
                                        name: 'heroicons_outline:exclamation',
                                        color: 'warning',
                                    },
                                    actions: {
                                        confirm: {
                                            show: false,
                                            label: 'ยืนยัน',
                                            color: 'warn',
                                        },
                                        cancel: {
                                            show: false,
                                            label: 'ยกเลิก',
                                        },
                                    },
                                    dismissible: true,
                                });
                            },
                            complete: () => {
                                this.toastr.success('ดำเนินการเพิ่มข้อมูลสำเร็จ')
                                this.dialogRef.close(true)
                            },
                        });
                    } else {
                        this._service.update(this.data.value.id, formValue).subscribe({
                            error: (err) => {
                                this.fuseConfirmationService.open({
                                    title: 'กรุณาตรวจสอบข้อมูล',
                                    message: err.error.message,
                                    icon: {
                                        show: true,
                                        name: 'heroicons_outline:exclamation',
                                        color: 'warning',
                                    },
                                    actions: {
                                        confirm: {
                                            show: false,
                                            label: 'ยืนยัน',
                                            color: 'warn',
                                        },
                                        cancel: {
                                            show: false,
                                            label: 'ยกเลิก',
                                        },
                                    },
                                    dismissible: true,
                                });
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
