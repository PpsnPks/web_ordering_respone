import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DataTablesModule } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { FilePickerModule, ValidationError } from 'ngx-awesome-uploader';
import { ProductComposeComponent } from './dialog/product-compose/product-compose.component';
import { ProductService } from './product.service';
import { ButtonNgComponent } from 'app/modules/datatables/button-ng/button-ng.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DataTablesModule, MatButtonModule, MatIconModule, FilePickerModule, ButtonNgComponent],
  providers: [DatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  categories: any[] = [];

  @ViewChild('btNg') btNg: TemplateRef<ButtonNgComponent>;

  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.categories$.subscribe((resp) => this.categories = resp);

    setTimeout(() => {
      this.dtOptions = {
        pageLength: 25,
        serverSide: true,
        ajax: (dataTablesParameters: any, callback) => {
          this.productService.datatable(dataTablesParameters).subscribe({
            next: (resp: any) => {
              callback({
                recordsTotal: resp.meta.totalItems,
                recordsFiltered: resp.meta.totalItems,
                data: resp.data
              });
            }
          }
          )
        },
        columns: [
          {
            title: 'เลขที่',
            data: 'id'
          },
          {
            title: 'รหัสสินค้า',
            data: 'code'
          },
          {
            title: 'สินค้า',
            data: 'name'
          },
          {
            title: 'วันที่และเวลา',
            data: 'createdAt',
            ngPipeInstance: this.datePipe,//เปลียนเวลาโดยการใช่ datepipe
            ngPipeArgs: [" dd-MM-yyyy HH:mm น."]
          },
          {
            title: 'จัดการ',
            data: null,
            defaultContent: '',
            ngTemplateRef: {
              ref: this.btNg,
            }
          }
        ]
      };
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dtTrigger.next(this.dtOptions);
    }, 200);
  }

  opendialogapro() {
    const DialogRef = this.dialog.open(ProductComposeComponent, {
      disableClose: true,
      data: {}
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
