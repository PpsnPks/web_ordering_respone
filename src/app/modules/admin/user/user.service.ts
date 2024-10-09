import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toUpper } from 'lodash';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _categories: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _roles: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _branch: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  branches: any[] = [];
  selectedBranches: any[] = [];
  get categories$() {
    return this._categories.asObservable();
  }

  constructor(private http: HttpClient) { }

  // datatable(dataTablesParameters: any) {
  //   const { start, length } = dataTablesParameters;
  //   const page = start / length + 1;
  //   return this.http.get('/api/user/datatables', {
  //     params: {
  //       limit: length,
  //       page: page,
  //     }
  //   }).pipe(
  //     map((resp: any) => {
  //       resp.data.forEach((e: any, i: number) => e.no = start + i + 1);
  //       return resp;
  //     })
  //   );
  // }


  datatable(dataTablesParameters: any) {
    const { columns, order, search, start, length } = dataTablesParameters;
    const page = start / length + 1;
    const column = columns[order[0].column].data;
    const dir = toUpper(order[0].dir);
    const sortBy = column + ':' + dir;

    return this.http.get('/api/user/datatables', {
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
  get branches$() {
    return this._branch.asObservable();
  }
  create(data: any) {
    return this.http.post('/api/user', data)
  }

  update(id: any,data: any) {
    return this.http.put('/api/user/' + id, data)
  }

  getRole() {
    return this.http.get('/api/role').pipe(
      tap((resp: any) => {
        this._roles.next(resp);
      }),
    )
  }

  getBranch() {
    return this.http.get('/api/branch').pipe(
      tap((resp: any) => {
        this._branch.next(resp);
      })
    );
  }



  delete(id: number) {
    return this.http.delete('/api/user/' + id)
  }
}
