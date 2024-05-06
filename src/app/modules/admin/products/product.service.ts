import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toUpper } from 'lodash';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _categories: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _units: BehaviorSubject<any[] | null> = new BehaviorSubject(null);

  get categories$() {
    return this._categories.asObservable();
  }

  get units$() {
    return this._units.asObservable();
  }

  constructor(private http: HttpClient) { }

  datatable(dataTablesParameters: any) {
    const { columns, order, search, start, length } = dataTablesParameters;
    const page = start / length + 1;
    const column = columns[order[0].column].data;
    const dir = toUpper(order[0].dir);
    const sortBy = column + ':' + dir;

    return this.http.get('api/product/datatables', {
      params: {
        page: page,
        limit: length,
        sortBy: sortBy,
        search: search.value,
      }
    }).pipe(
      map((resp: any) => {
        resp.data.forEach((e: any, i: number) => e.no = start + i + 1);
        return resp;
      })
    );
  }

  create(data: any) {
    return this.http.post('api/product', data)
  }

  getCategories() {
    return this.http.get('api/category').pipe(
      tap((resp: any) => {
        this._categories.next(resp);
      }),
    )
  }
  getUnit() {
    return this.http.get('api/unit').pipe(
      tap((resp: any) => {
        this._units.next(resp);
      }),
    )
  }

  delete(id: number) {
    return this.http.delete('/api/product/' + id)
  }
  postAt(id: number, data2: any) {
    return this.http.post('api/product/' + id + '/attribute', data2);

  }
}
