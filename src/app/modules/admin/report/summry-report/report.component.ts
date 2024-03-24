import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
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
import { ReportService } from '../page.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderStatusPipe } from 'app/modules/shared/order-status.pipe';
import { Router } from '@angular/router';
import { DialogForm } from './form-dialog/dialog.component';
import { SearchComponent } from 'app/modules/shared/search-component/search.component';
@Component({
    selector: 'app-page-unit',
    standalone: true,
    imports: [
        CommonModule,
        DataTablesModule,
        MatButtonModule,
        MatIconModule,
        FilePickerModule,
        MatMenuModule,
        MatDividerModule,
        MatDatepickerModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        SearchComponent
    ],
    providers: [
        OrderStatusPipe,
        CurrencyPipe,
        DatePipe
    ],
    templateUrl: './report.component.html',
    styleUrl: './report.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ReportComponent implements OnInit, AfterViewInit {
    dtOptions: any = {};
    dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
    form:FormGroup
    @ViewChild('btNg') btNg: any;
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;

    constructor(
        private _service: ReportService,
        private fuseConfirmationService: FuseConfirmationService,
        private toastr: ToastrService,
        public dialog: MatDialog,
        private _fb: FormBuilder,
        private orderStatus:  OrderStatusPipe,
        private currencyPipe:  CurrencyPipe,
        private datePipe: DatePipe,
        private _router: Router

    ) {
        this.form = this._fb.group({
            startDate: '',
            endDate: '',
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

    loadTable(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            serverSide: true,     // Set the flag
            ajax: (dataTablesParameters: any, callback) => {
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
                    className: 'w-15'
                },
                {
                    title: 'วันที่ทำรายการ',
                    data: 'createdAt',
                    ngPipeInstance: this.datePipe,
                    ngPipeArgs: ['dd-MM-yyyy : HH:mm']
                },
          
                {
                    title: 'เลขที่ทำรายการ',
                    data: 'orderNo'
                },
                {
                    title: 'ส่วนลด',
                    data: 'discount',
                    ngPipeInstance: this.currencyPipe,
                    ngPipeArgs: ['THB']
                },
                {
                    title: 'ยอดรวม',
                    data: 'total',
                    ngPipeInstance: this.currencyPipe,
                    ngPipeArgs: ['THB']
                },
                {
                    title: 'ยอดรวมสุทธิ',
                    data: 'grandTotal',
                    ngPipeInstance: this.currencyPipe,
                    ngPipeArgs: ['THB']
                },
                {
                    title: 'สถานะ',
                    data: 'orderStatus',
                    ngPipeInstance: this.orderStatus
                    
                },
                {
                    title: 'จัดการ',
                    data: null,
                    defaultContent: '',
                    ngTemplateRef: {
                        ref: this.btNg,
                    },
                    className: 'w-15'
                }

            ]
        }
    }



    rerender(): void {        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(this.dtOptions);
        });
    }

    printBill(item: any) {
        const url = '/report/print/' + item;
        window.open(url, '_blank');
    }

    openDialogSearch() {
        const DialogRef = this.dialog.open(DialogForm, {
            disableClose: true,
            width: '500px',
            maxHeight: '90%',
            enterAnimationDuration: 300,
            exitAnimationDuration: 300,
            data: {
                type: 'NEW'
            }
        });
        DialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result, 'result')
               
            }
        });
    }
    yourData : any
    handleChange(updateData: any): void {
        this.yourData = updateData
        console.log(this.yourData)
    }
}
