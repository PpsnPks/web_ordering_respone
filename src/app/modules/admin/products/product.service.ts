import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';

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
    const { start, length } = dataTablesParameters;
    const page = start / length + 1;
    return this.http.get('api/product/datatables', {
      params: {
        page: page,
        limit: length,
      }
    }).pipe(
      map((resp: any) => {
        resp.data.forEach((e: any, i: number) => e.no = start + i + 1);
        return resp;
      })
    );
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

  delete(id: number) {
    return this.http.delete('/api/product/' + id)
  }
}
