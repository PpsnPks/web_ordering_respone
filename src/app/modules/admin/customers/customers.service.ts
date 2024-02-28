import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    constructor(
        private http: HttpClient,
    ) { }
    datatable(dataTablesParameters: any) {
        return this.http.get('api/customer/datatables')
    }
    create(datacustomer: { code: string, name: string, address: string, phoneNumber: string }) {
        return this.http.post('api/customer', {
            "code": datacustomer.code,
            "name": datacustomer.name,
            "address": datacustomer.address,
            "phoneNumber": datacustomer.phoneNumber
        })
    }
}
