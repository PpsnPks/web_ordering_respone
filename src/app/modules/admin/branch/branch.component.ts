
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BranchService } from './branch.service';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Dialogbranch } from '../dialogBranch/dialogb.component';
import { ADTSettings } from 'angular-datatables/src/models/settings';
@Component({
    selector: 'app-branch',
    standalone: true,
    imports: [CommonModule, DataTablesModule, MatButtonModule, MatIconModule,],
    providers: [DatePipe],
    templateUrl: './branch.component.html',
    styleUrl: './branch.component.scss'
})
export class BranchComponent implements OnInit {
    @ViewChild('dataTable', { static: false }) private dataTableRef: any;
    dataTable: any; // ต้องมีการประกาศ property นี้

    dtOptions: ADTSettings = {};
    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    constructor(
        private branchService: BranchService,
        public dialog: MatDialog,
        private datePipe: DatePipe,
        public renderer: Renderer2
    ) { }
    opendialogbranch() {
        const dialogRef = this.dialog.open(Dialogbranch, {
            width: '500px', // กำหนดความกว้างของ Dialog

        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.rerender()
            }
        });
    }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            serverSide: true,     // Set the flag
            ajax: (dataTablesParameters: any, callback) => {
                this.branchService.datatable(dataTablesParameters).subscribe(
                    {
                        next: (resp: any) => {
                            this.pages.current_page = resp.meta.currentPage;
                            this.pages.per_page = resp.itemsPerPage;
                            if (resp.currentPage > 1) {
                                this.pages.begin =
                                    resp.itemsPerPage * resp.currentPage - 1;
                            } else {
                                this.pages.begin = 0;
                            }
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
                    title: 'No',
                    data: null,
                    render: (data, type, row, meta) => {
                        return this.pages.begin + meta.row + 1;
                    }
                },
                {
                    title: 'รหัสสาขา',
                    data: 'code'
                }, 
                {
                    title: 'สาขา',
                    data: 'name'
                }, 
                {
                    title: 'วันที่และเวลา',
                    data: 'createdAt',
                    ngPipeInstance: this.datePipe,//เปลียนเวลาโดยการใช่ datepipe
                    ngPipeArgs: ["dd-MM-yyyy HH:mm น."]
                },
            ]
            
        };
        // this.dataTable = $(this.dataTableRef.nativeElement).DataTable(this.dtOptions);
    }


    
}
