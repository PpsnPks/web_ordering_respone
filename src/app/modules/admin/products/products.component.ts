import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { ProductComposeComponent } from './dialog/product-compose/product-compose.component';
import { ProductService } from './product.service';
import { Subject } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DataTablesModule, MatButtonModule, MatIconModule, FilePickerModule,
    MatMenuModule, MatDividerModule
  ],
  providers: [DatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  categories: any[] = [];

  @ViewChild('btNg') btNg: any;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private productService: ProductService,
    private fuseConfirmationService: FuseConfirmationService,
    private toastr: ToastrService,
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
            title: 'ลำดับ',
            data: 'no',
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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
    const DialogRef = this.dialog.open(ProductComposeComponent, {
      disableClose: true,
      data: {}
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
          color: "warn"
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
          this.productService.delete(id).subscribe({
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
