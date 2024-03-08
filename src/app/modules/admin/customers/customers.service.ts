import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {
    private _data: BehaviorSubject<any | null> = new BehaviorSubject(null);
    constructor(
        private http: HttpClient,
    ) { }
    datatable(dataTablesParameters: any) {
        return this.http.get('/api/customer/datatables')
    }
    create(data: { code: string, name: string, address: string, phoneNumber: string , taxId: string, level: string,license_plate: string }) {
        return this.http.post('/api/customer', {
            "code": data.code,
            "name": data.name,
            "address": data.address,
            "phoneNumber": data.phoneNumber,
            "taxId": data.taxId,
            "levelId": data.level,
            "licensePlate": data.license_plate
        })
    }
    delete(id: any) {
        return this.http.delete('/api/customer/' + id )
    }
    getLevel(): Observable<any> {
        return this.http
            .get<any>('/api/level')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    
}
