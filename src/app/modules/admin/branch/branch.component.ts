
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
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
    dtOptions: ADTSettings = {};
    constructor(
        private branchService: BranchService,
        public dialog: MatDialog,
        private datePipe: DatePipe
    ) { }
    opendialogbranch() {
        const DialogRef = this.dialog.open(Dialogbranch, {
            data: {}
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
                title: 'ID',
                data: 'id'
            }, {
                title: 'code',
                data: 'code'
            }, {
                title: 'สาขา',
                data: 'name'
            }, {
                title: 'At',
                data: 'createdAt',
                ngPipeInstance: this.datePipe,//เปลียนเวลาโดยการใช่ datepipe
                ngPipeArgs: ["dd-MM-yyyy"]
            },
                //     {
                //     title: 'ร้าน',
                //     data: ' storeId'
                // },
            ]
        };

    }

}
