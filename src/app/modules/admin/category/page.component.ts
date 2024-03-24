
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CategoryService } from './page.service';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { DialogCategory } from './form-dialog/dialog.component';
import { Subject } from 'rxjs';
import { DemoNgComponent } from 'app/modules/shared/button-edit/ng-template-ref.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
@Component({
    selector: 'app-category',
    standalone: true,
    imports: [CommonModule, DataTablesModule, MatButtonModule, MatIconModule,],
    providers: [DatePipe],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss'
})

export class CategoryComponent implements OnInit {
    @ViewChild('demoNg') demoNg: TemplateRef<DemoNgComponent>;
    message = '';
    dataRow: any[] = []
    dtOptions: ADTSettings = {};
    dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();


    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    constructor(
        private _service: CategoryService,
        public dialog: MatDialog,
        private DatePipe: DatePipe,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
    ) {

    }

    opendialog(item, status) {
        const dialogRef = this.dialog.open(DialogCategory, {
            width: '500px', // กำหนดความกว้างของ Dialog
            data: {
                type: status,
                value: item
            }

        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.rerender()
            }
        });
    }

    ngOnInit(): void {
        this.loadTable()
        // this.dtOptions = {
        //     pagingType: 'full_numbers',
        //     serverSide: true,     // Set the flag
        //     ajax: (dataTablesParameters: any, callback) => {


        //         this.customerService.datatable(dataTablesParameters).subscribe(
        //             {
        //                 next: (resp: any) => {
        //                     this.dataRow = resp.data
        //                     this.pages.current_page = resp.meta.currentPage;
        //                     this.pages.per_page = resp.itemsPerPage;
        //                     if (resp.currentPage > 1) {
        //                         this.pages.begin =
        //                             resp.itemsPerPage * resp.currentPage - 1;
        //                     } else {
        //                         this.pages.begin = 0;
        //                     }
        //                     callback({
        //                         recordsTotal: resp.meta.totalItems,
        //                         recordsFiltered: resp.meta.totalItems,
        //                         data: resp.data
        //                     });
        //                 }
        //             }
        //         )
        //     },
        //     columns: [
        //         { data: 'action', orderable: false },
        //         { data: 'No' },
        //         { data: 'name' },
        //         { data: 'email' },
        //         { data: 'tel' },
        //         { data: 'create_by' },
        //         { data: 'created_at' },
        //     ]
        // };

    }

    deleteElement(id: string) {
        const confirmation = this._fuseConfirmationService.open({
            "title": "ลบข้อมูล",
            "message": "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
            "icon": {
                "show": true,
                "name": "heroicons_outline:exclamation-triangle",
                "color": "warn"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "ลบ",
                    "color": "warn"
                },
                "cancel": {
                    "show": true,
                    "label": "ยกเลิก"
                }
            },
            "dismissible": true
        });
        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._service.delete(id).subscribe({
                    next: (resp: any) => {

                    },
                    error: (err: any) => {
                        this._fuseConfirmationService.open({
                            "title": "กรุณาระบุข้อมูล",
                            "message": err.error.message,
                            "icon": {
                                "show": true,
                                "name": "heroicons_outline:exclamation",
                                "color": "warning"
                            },
                            "actions": {
                                "confirm": {
                                    "show": false,
                                    "label": "ยืนยัน",
                                    "color": "primary"
                                },
                                "cancel": {
                                    "show": false,
                                    "label": "ยกเลิก",
                                }
                            },
                            "dismissible": true
                        });
                    }
                })
            }
        })
        this._service.delete(id).subscribe((resp: any) => {

        })
    }

    loadTable(): void {
        const that = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            serverSide: true,
            processing: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.status = null;
                that._service
                    .datatable(dataTablesParameters)
                    .subscribe((resp: any) => {
                        this.dataRow = resp.data;
                        this.pages.current_page = resp.meta.currentPage;
                        this.pages.per_page = resp.meta.itemsPerPage;
                        if (resp.currentPage > 1) {
                            this.pages.begin =
                                resp.meta.itemsPerPage * resp.meta.currentPage - 1;
                        } else {
                            this.pages.begin = 0;
                        }
                        callback({
                            recordsTotal: resp.meta.totalItems,
                            recordsFiltered: resp.meta.totalItems,
                            data: [],
                        });
                        this._changeDetectorRef.markForCheck();
                    });
            },
            columns: [
                { data: 'action', orderable: false },
                { data: 'No' },
                { data: 'code' },
                { data: 'name' },
                { data: 'createdAt' },
            ],
        };
    }


    ngAfterViewInit() {
        setTimeout(() => {
            // race condition fails unit tests if dtOptions isn't sent with dtTrigger
            this.dtTrigger.next(this.dtOptions);
        }, 200);
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

  

}