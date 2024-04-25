import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { BannerComposeComponent } from './dialog/banner-compose/banner-compose.component';
import { BannerService } from './banner.service';
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
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.scss'
})
export class BannersComponent implements OnInit, AfterViewInit {
  dtOptions: any = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  @ViewChild('btNg') btNg: any;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private bannerService: BannerService,
    private fuseConfirmationService: FuseConfirmationService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dtOptions = {
        serverSide: true,
        ajax: (dataTablesParameters: any, callback) => {
          this.bannerService.datatable(dataTablesParameters).subscribe({
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
            orderable: false,
            title: 'ลำดับ',
            data: 'no',
            className: 'w-15',
          },
          {
            title: 'ชื่อแบนเนอร์',
            data: 'name'
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
        ],
        // columnDefs: [
        //   {
        //     orderable: false,
        //     className: 'select-checkbox',
        //     targets: 0
        //   }
        // ],
        // select: {
        //   style: 'multi',
        //   // selector: 'td:first-child'
        // },
        order: [[1, 'asc']]
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
      dtInstance.destroy();
      this.dtTrigger.next(this.dtOptions);
    });
  }

  opendialogapro() {
    const DialogRef = this.dialog.open(BannerComposeComponent, {
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
          this.bannerService.delete(id).subscribe({
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
