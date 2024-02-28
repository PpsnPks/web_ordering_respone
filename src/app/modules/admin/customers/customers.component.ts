
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersService } from './customers.service';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Dialogcustomer } from '../dialogcustomer/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-customer',
    standalone: true,
    imports: [CommonModule, DataTablesModule, MatIconModule, MatButtonModule],
    templateUrl: './customers.component.html',
    styleUrl: './customers.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Customerscomponent implements OnInit {
    dtOptions: DataTables.Settings = {};
    constructor(
        private customerService: CustomersService,
        public dialog: MatDialog,
    ) { }

    opendialogcustomer() {
        const DialogRef = this.dialog.open(Dialogcustomer, {
            data: {}
        });
    }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            serverSide: true,     // Set the flag
            ajax: (dataTablesParameters: any, callback) => {


                this.customerService.datatable(dataTablesParameters).subscribe(
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
                title: 'name',
                data: 'name'
            }, {
                title: 'number',
                data: 'phoneNumber'
            }, {
                title: 'At',
                data: 'createdAt'
            },
            ]
        };

    }

}
