import { AddProductService } from './AddProduct.service';
import { dialogapro } from './../dialogAddproduct/dialogapro.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { FilePickerModule, ValidationError } from 'ngx-awesome-uploader';
import { HttpClient } from '@angular/common/http';
import { DemoFilePickerAdapter } from '../AddProduct/demo-file-picker.adapter';
@Component({
    selector: 'app-AddProduct',
    standalone: true,
    imports: [CommonModule, DataTablesModule, MatButtonModule, MatIconModule, FilePickerModule],
    providers: [DatePipe],
    templateUrl: './AddProduct.component.html',
    styleUrl: './AddProduct.component.scss'
})
export class AddProductcomponent implements OnInit {
    public adapter = new DemoFilePickerAdapter(this.http);
    dtOptions: ADTSettings = {};
    constructor(
        // private branchService: BranchService,
        public dialog: MatDialog,
        private datePipe: DatePipe,
        private AddProductService: AddProductService,
        private http: HttpClient,
    ) { }
    opendialogapro() {
        const DialogRef = this.dialog.open(dialogapro, {
            data: {}
        });
    }
    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            serverSide: true,     // Set the flag
            ajax: (dataTablesParameters: any, callback) => {

                this.AddProductService.datatable(dataTablesParameters).subscribe(
                    {
                        next: (resp: any) => {
                            console.log(resp);

                            callback({
                                recordsTotal: resp.meta.totalItems,
                                recordsFiltered: resp.meta.totalItems,
                                data: resp.data

                            });
                        }
                    }
                )
            },
            columns: [{
                title: 'เลขที่',
                data: 'id'
            }, {
                title: 'รหัสสินค้า',
                data: 'code'
            }, {
                title: 'สินค้า',
                data: 'name'
            }, {
                title: 'วันที่และเวลา',
                data: 'createdAt',
                ngPipeInstance: this.datePipe,//เปลียนเวลาโดยการใช่ datepipe
                ngPipeArgs: [" dd-MM-yyyy HH:mm น."]
            },
                //     {
                //     title: 'ร้าน',
                //     data: ' storeId'
                // },
            ]
        };

    }

    public uploadSuccess(event): void {
        console.log(event);
    }

    public onValidationError(error: ValidationError): void {
        alert(`Validation Error ${error.error} in ${error.file?.name}`);
    }

}
