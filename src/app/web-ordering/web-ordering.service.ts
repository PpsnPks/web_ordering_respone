import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebOrderingService {

  constructor(private http: HttpClient) { }
  order: any
  total: any

  sendOrder(data:any){
	this.order = data
  }

  receiveOrder(){
	return this.order
  }

  set_sumPrice(data: any){
    this.total = data
    console.log("set_sumPrice" ,this.total);
    
  }

  get_sumPrice(){
    return this.total
  }
//  datatable(dataTablesParameters: any) {
//    const { columns, order, search, start, length } = dataTablesParameters;
//    const page = start / length + 1;
//    const column = columns[order[0].column].data;
//    const dir = toUpper(order[0].dir);
//    const sortBy = column + ':' + dir;

//    return this.http.get('/api/unit/datatables', {
//      params: {
//        page: page,
//        limit: length,
//        sortBy: sortBy,
//        search: search.value,
//      }
//    }).pipe(
//      map((resp: any) => {
//        resp.data.forEach((e: any, i: number) => e.no = start + i + 1);
//        return resp;
//      })
//    );
//  }

//  create(data: any) {
//    return this.http.post('/api/unit', data)
//  }

//  update(id: any,data: any) {
//    return this.http.put('/api/unit/' + id, data)
//  }

//  getRole() {
//    return this.http.get('/api/role').pipe(
//      tap((resp: any) => {
//        this._roles.next(resp);
//      }),
//    )
//  }

//  delete(id: number) {
//    return this.http.delete('/api/unit/' + id)
//  }
}
