import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BranchService {

    constructor(
        private http: HttpClient,
    ) { }
    datatable(dataTablesParameters: any) {
        return this.http.get('/api/branch/datatables')
    }
    create(daatabranch: { code: string, name: string, storeId: number, address: string, }) {
        return this.http.post('api/branch', {
            "code": daatabranch.code,
            "name": daatabranch.name,
            "storeId": daatabranch.storeId,
            "address": daatabranch.address,

        })
    }
}
