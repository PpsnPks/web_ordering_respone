import { CommonModule } from '@angular/common';
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
import { DialogForm } from './form-dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from './order.service';
import { DateTime } from 'luxon';
import { orderBy } from 'lodash';
@Component({
    selector: 'app-order',
    standalone: true,
    imports: [
        CommonModule,
        DataTablesModule,
        MatButtonModule,
        MatIconModule,
        FilePickerModule,
        MatMenuModule,
        MatDividerModule
    ],
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class OrderComponent implements OnInit, AfterViewInit {
    dtOptions: any = {};
    dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

    @ViewChild('btNg') btNg: any;
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;

    constructor(
        private _service: OrderService,
        private fuseConfirmationService: FuseConfirmationService,
        private toastr: ToastrService,
        public dialog: MatDialog,

    ) {

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

    formatDateTime(date: string): string {
        return DateTime.fromISO(date).toFormat('dd/MM/yyyy HH:mm:ss');
    }

    loadTable(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            serverSide: true,     // Set the flag
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.filter = {
                    'filter.orderStatus': 'complete'
                }
                this._service.datatable(dataTablesParameters).subscribe({
                    next: (resp: any) => {
                        callback({
                            recordsTotal: resp.meta.totalItems,
                            recordsFiltered: resp.meta.totalItems,
                            data: resp.data
                        });
                    }
                })
            },
            columns: [
                {
                    title: 'ลำดับ',
                    data: 'no',
                    defaultContent: '-',
                    className: 'w-15 text-center'
                },
                {
                    title: 'เลขที่ทำรายการ',
                    defaultContent: '-',
                    data: 'orderNo',
                    className: 'text-left'
                },
                {
                    title: 'วันที่ทำรายการ',
                    defaultContent: '-',
                    data: function(row: any) {
                        return DateTime.fromISO(row.orderDate).toFormat('dd/MM/yyyy HH:mm:ss');
                    },
                    className: 'text-left'
                },
                {
                    title: 'ร้านค้า',
                    defaultContent: '-',
                    data: 'device.name',
                    className: 'text-left'
                },
                {
                    title: 'ช่องทางชำระ',
                    defaultContent: '-',
                    data: function(row: any) {
                        const successfulPayments = row.orderPayments.filter(payment => payment.status === 'success');
                        return successfulPayments.length > 0 ? successfulPayments[0].paymentMethod.name : '-';
                    },
                    className: 'text-left'
                },
                {
                    title: 'สถานะ',
                    defaultContent: '-',
                    data: 'orderStatus',
                    className: 'text-left'
                },
                {
                    title: 'Grand Total',
                    defaultContent: '-',
                    data: 'grandTotal',
                    className: 'text-left'
                },
                {
                    title: 'จัดการ',
                    data: null,
                    defaultContent: '',
                    ngTemplateRef: {
                        ref: this.btNg,
                    },
                    className: 'w-15 text-center'
                }

            ],
            // orderBy: [[1, 'DESC']]
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



    opendialogapro() {
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

    openDialogEdit(item: any) {
        this._service.getById(item.id).subscribe((resp: any)=> {

            const DialogRef = this.dialog.open(DialogForm, {
                disableClose: true,
                width: '500px',
                height: 'auto',
                enterAnimationDuration: 300,
                exitAnimationDuration: 300,
                data: {
                    type: 'EDIT',
                    value: resp
                }
            });
            DialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    console.log(result, 'result')
                    this.rerender();
                }
            });
        })
      
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
}


