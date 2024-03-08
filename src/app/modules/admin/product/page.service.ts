import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private _data: BehaviorSubject<any | null> = new BehaviorSubject(null);
    constructor(
        private http: HttpClient,
    ) { }
    datatable(dataTablesParameters: any) {
        return this.http.get('/api/product/datatables')
    }
    create(daatabranch: { code: string, name: string, storeId: number, address: string, }) {
        return this.http.post('api/product', {
            "code": daatabranch.code,
            "name": daatabranch.name,
            "storeId": daatabranch.storeId,
            "address": daatabranch.address,

        })
    }

    getStore(): Observable<any> {
        return this.http
            .get<any>(environment.apiUrl + '/api/product')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getUnit(): Observable<any> {
        return this.http
            .get<any>('/api/unit')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getCategory(): Observable<any> {
        return this.http
            .get<any>('/api/category')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getById(id: string): Observable<any> {
        return this.http
            .get<any>('/api/product/' + id)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    delete(id: any) {
        return this.http.delete('/api/product/' + id )
    }
}
