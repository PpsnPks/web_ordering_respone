import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AddProductService {

    constructor(
        private http: HttpClient,
    ) { }
    datatable(dataTablesParameters: any) {
        return this.http.get('/api/product/datatables')
    }
    create(dataAproduct: { code: string, name: string, price: string, details: string, }) {
        return this.http.post('api/product', {
            "code": dataAproduct.code,
            "name": dataAproduct.name,
            "price": dataAproduct.price,
            "details": dataAproduct.details,

        })
    }
}
