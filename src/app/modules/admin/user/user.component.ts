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
            pagingType: 'full_numbers',
            serverSide: true,     // Set the flag
            ajax: (dataTablesParameters: any, callback) => {
                callback({
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: [{ "id": 1, "firstName": "Jerrome", "lastName": "Lovitt" },
                    { "id": 2, "firstName": "Micaela", "lastName": "Jeffels" },
                    { "id": 3, "firstName": "Ruy", "lastName": "Tamplin" },
                    { "id": 4, "firstName": "Lucian", "lastName": "Scotson" },
                    { "id": 5, "firstName": "Moe", "lastName": "Bandy" },
                    { "id": 6, "firstName": "Toddy", "lastName": "Brettell" },
                    { "id": 7, "firstName": "Don", "lastName": "Shann" },
                    { "id": 8, "firstName": "Katrine", "lastName": "Woliter" },
                    { "id": 9, "firstName": "Emmott", "lastName": "Mieville" },
                    { "id": 10, "firstName": "Allyson", "lastName": "Patnelli" },
                    { "id": 11, "firstName": "Chan", "lastName": "Lippett" },
                    { "id": 12, "firstName": "Isidora", "lastName": "Leonards" },
                    { "id": 13, "firstName": "Gilberto", "lastName": "Coventon" },
                    { "id": 14, "firstName": "Abbott", "lastName": "Mucklo" },
                    { "id": 15, "firstName": "Agatha", "lastName": "West-Frimley" },
                    { "id": 16, "firstName": "Brita", "lastName": "Donhardt" },
                    { "id": 17, "firstName": "Mureil", "lastName": "Bergeau" },
                    { "id": 18, "firstName": "Jory", "lastName": "Law" },
                    { "id": 19, "firstName": "Itch", "lastName": "Crass" },
                    { "id": 20, "firstName": "Shaina", "lastName": "Murrthum" },
                    { "id": 21, "firstName": "Dena", "lastName": "Autie" },
                    { "id": 22, "firstName": "Lanna", "lastName": "Puddle" },
                    { "id": 23, "firstName": "Trefor", "lastName": "Beauman" },
                    { "id": 24, "firstName": "Curran", "lastName": "Shurmer" },
                    { "id": 25, "firstName": "Donnajean", "lastName": "Warriner" },
                    { "id": 26, "firstName": "Christabella", "lastName": "Mortlock" },
                    { "id": 27, "firstName": "Betteanne", "lastName": "McGowan" },
                    { "id": 28, "firstName": "Jarib", "lastName": "Cruden" },
                    { "id": 29, "firstName": "Aurore", "lastName": "Flowers" },
                    { "id": 30, "firstName": "Virgilio", "lastName": "Hinkensen" },
                    { "id": 31, "firstName": "Ezmeralda", "lastName": "Dineen" },
                    { "id": 32, "firstName": "Stewart", "lastName": "Molian" },
                    { "id": 33, "firstName": "Ashly", "lastName": "Gribbon" },
                    { "id": 34, "firstName": "Shani", "lastName": "McKeggie" },
                    { "id": 35, "firstName": "Angele", "lastName": "Debney" },
                    { "id": 36, "firstName": "Sarette", "lastName": "Ausello" },
                    { "id": 37, "firstName": "Sherry", "lastName": "Sproule" },
                    { "id": 38, "firstName": "Sauncho", "lastName": "Eve" },
                    { "id": 39, "firstName": "Magda", "lastName": "Proudlock" },
                    { "id": 40, "firstName": "Ker", "lastName": "Bullen" },
                    { "id": 41, "firstName": "Consuelo", "lastName": "Rolley" },
                    { "id": 42, "firstName": "Malory", "lastName": "Longbothom" },
                    { "id": 43, "firstName": "Trev", "lastName": "Merrydew" },
                    { "id": 44, "firstName": "Emelyne", "lastName": "Pessold" },
                    { "id": 45, "firstName": "Tasha", "lastName": "Coules" },
                    { "id": 46, "firstName": "Alix", "lastName": "Mayes" },
                    { "id": 47, "firstName": "Lilias", "lastName": "Owthwaite" },
                    { "id": 48, "firstName": "Devondra", "lastName": "Gudgion" },
                    { "id": 49, "firstName": "Donella", "lastName": "Stait" },
                    { "id": 50, "firstName": "Anica", "lastName": "Dedman" }
                    ]
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
