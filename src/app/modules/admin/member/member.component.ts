import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PictureComponent } from '../picture/picture.component';
import { ProductComposeComponent } from '../product/dialog/product-compose/product-compose.component';
import { MemberService } from './member.service';
import { MemberComposeComponent } from './dialogcustomer/member-compose.component';
import { DialogForm } from './form-dialog/dialog.component';
import { DialogCreditComponent } from './dialog-credit/dialog-credit.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
    selector: 'app-member',
    standalone: true,
    imports: [
        CommonModule,
        DataTablesModule,
        MatButtonModule,
        MatIconModule,
        FilePickerModule,
        MatMenuModule,
        MatDividerModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        CurrencyPipe
    ],
    templateUrl: './member.component.html',
    styleUrl: './member.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class MemberComponent implements OnInit, AfterViewInit {
    dtOptions: any = {};
    dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
    form: FormGroup
    @ViewChild('btNg') btNg: any;
    @ViewChild('btPicture') btPicture: any;
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    category: any[] = [
        'A',
        'B',
        'C',
        'D',
    ];
    constructor(
        private _service: MemberService,
        private fuseConfirmationService: FuseConfirmationService,
        private toastr: ToastrService,
        public dialog: MatDialog,
        private currencyPipe: CurrencyPipe,
        private _router: Router,
        private _fb: FormBuilder

    ) {
    this.form = this._fb.group({
        card_type: '',
    })
    }
    ngOnInit(): void {
        setTimeout(() =>
            this.loadTable());

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.dtTrigger.next(this.dtOptions);
        }, 200);
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    onChangeType() {
        this.rerender()
    }

    loadTable(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            serverSide: true,     // Set the flag
            scrollX: true,
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.filter = {
                    'filter.card.card_type': this.form.value.card_type ?? '',
                    
                }
                this._service?.datatable(dataTablesParameters).subscribe({
                    next: (resp: any) => {
                        callback({
                            recordsTotal: resp?.meta?.totalItems,
                            recordsFiltered: resp?.meta?.totalItems,
                            data: resp?.data
                        });
                    }
                })
            },
            columns: [
                {
                    title: 'ลำดับ',
                    data: 'no',
                    className: 'w-15 text-center'
                },
                {
                    title: 'รหัสพนักงาน',
                    data: 'code',
                    className: 'w-30 text-left'
                },
                {
                    title: 'ชื่อ',
                    data: 'firstname',
                    className: 'text-left'
                },
                {
                    title: 'นามสกุล',
                    data: 'lastname',
                    className: 'text-left'
                },
                {
                    title: 'Card SN.',
                    defaultContent: '-',
                    data: 'card.sn',
                    className: 'text-left'
                },
                {
                    title: 'Card Type',
                    defaultContent: '-',
                    data: 'card.cardType',
                    className: 'text-center'
                },
                {
                    title: 'OT Credit',
                    data: 'creditEL2',
                    ngPipeInstance: this.currencyPipe,
                    ngPipeArgs: ['THB','symbol','1.0-0'],
                    className: 'text-center'
                },
                {
                    title: 'Persanal Wallet',
                    data: 'wallet',
                    ngPipeInstance: this.currencyPipe,
                    ngPipeArgs: ['THB','symbol','1.0-0'],
                    className: 'text-center'
                },
                {
                    title: 'VIP Credit',
                    data: 'creditEL4',
                    ngPipeInstance: this.currencyPipe,
                    ngPipeArgs: ['THB','symbol','1.0-0'],
                    className: 'text-center'
                },
                {
                    title: 'จัดการ',
                    data: null,
                    defaultContent: '',
                    ngTemplateRef: {
                        ref: this.btNg,
                    },
                    className: 'w-15 text-center',

                }

            ]
        }
    }



    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(this.dtOptions);
        });
    }

    opendialogapro2() {
        const DialogRef = this.dialog.open(DialogForm, {
            disableClose: true,
            width: '500px',
            height: 'auto',
            enterAnimationDuration: 300,
            exitAnimationDuration: 300,
            data: {
                type: 'NEW'
            }
        });
        DialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result, 'result')
                this.rerender();
            }
        });
    }

    opendialogapro() {
        const DialogRef = this.dialog.open(MemberComposeComponent, {
            disableClose: true,
            width: '500px',
            height: 'auto',
            enterAnimationDuration: 300,
            exitAnimationDuration: 300,
            data: {
                type: 'NEW'
            }
        });
        DialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result, 'result')
                this.rerender();
            }
        });
    }

    openDialogEdit(item: any) {
        const DialogRef = this.dialog.open(MemberComposeComponent, {
            disableClose: true,
            width: '500px',
            enterAnimationDuration: 300,
            exitAnimationDuration: 300,
            data: {
                type: 'EDIT',
                value: item
            }
        });
        DialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result, 'result')
                this.rerender();
            }
        });
    }

    openDialoCredit(item: any) {
        const DialogRef = this.dialog.open(DialogCreditComponent, {
            disableClose: true,
            width: '500px',
            enterAnimationDuration: 300,
            exitAnimationDuration: 300,
            data: {
                type: 'NEW',
                value: item
            }
        });
        DialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result, 'result')
                this.rerender();
            }
        });
    }



    clickDelete(id: any) {
        const confirmation = this.fuseConfirmationService.open({
            title: "ยืนยันลบข้อมูล",
            message: "กรุณาตรวจสอบข้อมูล หากลบข้อมูลแล้วจะไม่สามารถนำกลับมาได้",
            icon: {
                show: true,
                name: "heroicons_outline:exclamation-triangle",
                color: "warn"
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
                    this._service.delete(id).subscribe({
                        error: (err) => {

                        },
                        complete: () => {
                            this.toastr.success('ดำเนินการลบสำเร็จ');
                            this.rerender();
                        },
                    });
                }
            }
        )
    }
    showPicture(imgObject: string): void {
        console.log(imgObject)
        this.dialog
            .open(PictureComponent, {
                autoFocus: false,
                data: {
                    imgSelected: imgObject,
                },
            })
            .afterClosed()
            .subscribe(() => {
                // Go up twice because card routes are setup like this; "card/CARD_ID"
                // this._router.navigate(['./../..'], {relativeTo: this._activatedRoute});
            });
    }
    createProduct() {
        const DialogRef = this.dialog.open(ProductComposeComponent, {
            disableClose: true,
            width: '800px',
            height: '90%',
            enterAnimationDuration: 300,
            exitAnimationDuration: 300,
            data: {
                type: 'NEW'
            }
        });
        DialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result, 'result')
                this.rerender();
            }
        });
    }
}
