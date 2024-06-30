import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { removeEmpty } from 'app/helper';
import { toUpper } from 'lodash';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private _categories: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _roles: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _data: BehaviorSubject<any[] | null> = new BehaviorSubject(null);

  get categories$() {
    return this._categories.asObservable();
  }

  constructor(private http: HttpClient) { }

  datatable(dataTablesParameters: any) {
    const { columns, order, search, start, length, filter } = dataTablesParameters;
    const page = start / length + 1;
    const column = columns[order[0].column].data;
    const dir = toUpper(order[0].dir);
    const sortBy = column + ':' + dir;
    

    return this.http.get('/api/member/datatables', {
      params: {
        page: page,
        limit: length,
        sortBy: sortBy,
        search: search.value,
        ...removeEmpty(filter)
      }
    }).pipe(
      map((resp: any) => {
        resp.data.forEach((e: any, i: number) => e.no = start + i + 1);
        return resp;
      })
    );
  }

  create(data: any) {
    return this.http.post('/api/member', data)
  }

  update(id: any,data: any) {
    return this.http.put('/api/member/' + id, data)
  }

  getRole() {
    return this.http.get('/api/role').pipe(
      tap((resp: any) => {
        this._roles.next(resp);
      }),
    )
  }
  getUnit() {
    return this.http.get('/api/unit').pipe(
      tap((resp: any) => {
        this._data.next(resp);
      }),
    )
  }
  getCategory() {
    return this.http.get('/api/category').pipe(
      tap((resp: any) => {
        this._data.next(resp);
      }),
    )
  }
  getById(id:string) {
    return this.http.get('/api/member/'+ id).pipe(
      tap((resp: any) => {
        this._data.next(resp);
      }),
    )
  }

  delete(id: number) {
    return this.http.delete('/api/member/' + id)
  }
  import(data: FormData) {
    return this.http.post('/api/member/import-excel', data)
  }
  export(data:any) {
    return this.http.post(`/api/member/export/excel`, data, {
      responseType: 'blob'
    })
  }

  createCredit(data: any, id: any) {
    return this.http.post('/api/member/' + id + '/topup' , data)
  }
}
