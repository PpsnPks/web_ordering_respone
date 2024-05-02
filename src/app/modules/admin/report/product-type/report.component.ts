import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DataTablesModule } from 'angular-datatables';

import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportService } from '../page.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-report-product-type',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule,
        MatSelectModule
    ],

    templateUrl: './report.component.html',
    styleUrl: './report.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportProductTypeComponent implements OnInit {
    dtOptions: DataTables.Settings = {};
    orders: any[] = [];
    form: FormGroup;
    productType: any[] = [
        {id: 1 , name: 'กาแฟ' },
        {id: 2 , name: 'ชา' },
        {id: 3 , name: 'ขนมหวาน' },
        {id: 4 , name: 'ของทานเล่น' },

    ]
    range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    constructor(
        private _service : ReportService,
        public dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _fb: FormBuilder,
    ) {
        this.form = this._fb.group({
            product_type: '',

        })
    }
    ngOnInit(): void {
        this.form.patchValue({
            product_type: ''
        })
        this._service.getOrder().subscribe((resp: any)=>{
                this.orders = resp;


        })

        this.dtOptions = {
            pagingType: 'full_numbers',
            serverSide: true,     // Set the flag
            ajax: (dataTablesParameters: any, callback) => {
                callback({
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: [
                        {
                            "id": 1,
                            "createdAt": "2024-03-12T09:21:10.700Z",
                            "updatedAt": "2024-03-12T09:21:10.700Z",
                            "deletedAt": null,
                            "orderNo1" : "กาแฟ",
                            "orderNo": 30,
                            "orderNo2": 80,
                            "orderDate": "2024-03-12T09:21:10.716Z",
                            "orderStatus": "select_payment",
                            "total": 0,
                            "discount": 0,
                            "grandTotal": 110
                        },
                        {
                            "id": 2,
                            "createdAt": "2024-03-17T09:24:55.488Z",
                            "updatedAt": "2024-03-17T09:24:55.488Z",
                            "deletedAt": null,
                            "orderNo1" : "ชา",
                            "orderNo": 30,
                            "orderNo2": 80,
                            "orderDate": "2024-03-17T09:24:55.502Z",
                            "orderStatus": "select_payment",
                            "total": 1000,
                            "discount": 0,
                            "grandTotal": 110
                        },
                        {
                            "id": 3,
                            "createdAt": "2024-03-17T13:40:49.535Z",
                            "updatedAt": "2024-03-17T13:40:49.535Z",
                            "deletedAt": null,
                            "orderNo1" : "ขนมหวาน",
                            "orderNo": 30,
                            "orderNo2": 80,
                            "orderDate": "2024-03-17T13:40:49.547Z",
                            "orderStatus": "select_payment",
                            "total": 1001,
                            "discount": 0,
                            "grandTotal": 110
                        },
                        {
                            "id": 6,
                            "createdAt": "2024-03-17T19:39:35.101Z",
                            "updatedAt": "2024-03-17T19:39:35.101Z",
                            "deletedAt": null,
                            "orderNo1" : "ของทานเล่น",
                            "orderNo": 30,
                            "orderNo2": 80,
                            "orderDate": "2024-03-17T19:39:35.117Z",
                            "orderStatus": "select_payment",
                            "total": 1001,
                            "discount": 0,
                            "grandTotal": 110
                        }

                    ]
                });
            },
            columns: [
                {
                title: 'ID',
                data: 'id'
            },
             {
                title: 'ประเภทสินค้า',
                data: 'orderNo1',
                render: function (data, type, row) {
                    if (data === null || data === undefined || data === '') {
                        return '-';
                    }
                    return data;
                }
            },
            {
              title: 'เงินสด',
              data: 'orderNo2',
              render: function (data, type, row) {
                if (type === 'display' || type === 'filter') {
                  return Number(data).toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 });;
                }
                  return data;
              }
          },
            {
                title: 'พร้อมเพย์',
                data: 'orderNo',
                render: function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                      return Number(data).toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 });;
                    }
                    return data;
                }
            },

            {
                title: 'ยอดรวมสุทธิ',
                data: 'grandTotal',
                render: function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        // ใช้ toLocaleString() เพื่อแสดงเป็นเครื่องหมายเงิน (Currency) พร้อมกับเครื่องหมาย ','
                        return Number(data).toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 });
                    }
                    return data;
                }
            },
            {
                title: "วันที่ทำอัปเดต",
                data: "orderDate",
                render: function (data, type, row) {
                    // ตรวจสอบว่าประเภทข้อมูลเป็นแบบแสดงหรือไม่
                    if (type === 'display' || type === 'filter') {
                        // สร้างวัตถุ Date จากข้อมูลวันที่
                        var date = new Date(data);
                        // จัดรูปแบบวันที่ใหม่ (ในที่นี้จะใช้รูปแบบ 'dd/mm/yyyy')
                        var formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()+ ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                        return formattedDate;
                    }
                    // สำหรับประเภทข้อมูลอื่นๆ ให้คืนค่าข้อมูลเดิม
                    return data;
                }
            }
        ]
        };
    }
}
