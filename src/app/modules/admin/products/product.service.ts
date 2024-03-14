import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private _categories: BehaviorSubject<any[] | null> = new BehaviorSubject(null);

    get categories$() {
        return this._categories.asObservable();
    }

    constructor(private http: HttpClient) { }

    datatable(dataTablesParameters: any) {
        const { start, length} = dataTablesParameters;
        const page = start / length + 1;
        return this.http.get('api/product/datatables', {
            params: {
                limit: length ,
                page: page,
            }
        });
    }

    create(dataAproduct: { code: string, name: string, price: string, image: string, categoryId: number }) {
        return this.http.post('api/product', dataAproduct)
    }

    getCategories() {
        return this.http.get('api/category').pipe(
            tap((resp: any) => {
                this._categories.next(resp);
            }),
        )
    }
}
