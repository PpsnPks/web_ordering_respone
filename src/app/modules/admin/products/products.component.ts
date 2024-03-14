import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DataTablesModule } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { FilePickerModule, ValidationError } from 'ngx-awesome-uploader';
import { ProductComposeComponent } from './dialog/product-compose/product-compose.component';
import { ProductService } from './product.service';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, DataTablesModule, MatButtonModule, MatIconModule, FilePickerModule],
    providers: [DatePipe],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
    dtOptions: ADTSettings = {};

    categories: any[] = [];

    constructor(
        public dialog: MatDialog,
        private datePipe: DatePipe,
        private productService: ProductService,
        private http: HttpClient,
    ) { }

    ngOnInit(): void {
        this.productService.categories$.subscribe((resp) => this.categories = resp);

        this.dtOptions = {
            pagingType: 'full_numbers',
            serverSide: true,     // Set the flag
            ajax: (dataTablesParameters: any, callback) => {
                this.productService.datatable(dataTablesParameters).subscribe(
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

    opendialogapro() {
        const DialogRef = this.dialog.open(ProductComposeComponent, {
            disableClose: true,
            data: {}
        });
    }
    public uploadSuccess(event): void {
        console.log(event);
    }

    public onValidationError(error: ValidationError): void {
        alert(`Validation Error ${error.error} in ${error.file?.name}`);
    }

}
