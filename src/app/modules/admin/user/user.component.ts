import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        CommonModule, DataTablesModule
    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
    dtOptions: DataTables.Settings = {};

    ngOnInit(): void {
        this.dtOptions = {
            serverSide: true,     // Set the flag
            ajax: (dataTablesParameters: any, callback) => {

                callback({
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: []
                });
                // this.http
                //     .post<DataTablesResponse>(
                //         'https://xtlncifojk.eu07.qoddiapp.com/',
                //         dataTablesParameters, {}
                //     ).subscribe(resp => {
                //         callback({
                //             recordsTotal: resp.recordsTotal,
                //             recordsFiltered: resp.recordsFiltered,
                //             data: resp.data
                //         });
                //     });
            },
            columns: [{
                title: 'ID',
                data: 'id'
            }, {
                title: 'First name',
                data: 'firstName'
            }, {
                title: 'Last name',
                data: 'lastName'
            }]
        };
    }
}
