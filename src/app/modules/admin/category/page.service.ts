import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private _data: BehaviorSubject<any | null> = new BehaviorSubject(null);
    constructor(
        private http: HttpClient,
    ) { }
    datatable(dataTablesParameters: any) {
        return this.http.get('/api/category/datatables')
    }
    create(daatabranch: { code: string, name: string, storeId: number, address: string, }) {
        return this.http.post('api/category', {
            "code": daatabranch.code,
            "name": daatabranch.name,
            "storeId": daatabranch.storeId,
            "address": daatabranch.address,

        })
    }

    getStore(): Observable<any> {
        return this.http
            .get<any>(environment.apiUrl + '/api/category')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    delete(id: any) {
        return this.http.delete('/api/category/' + id )
    }
}
