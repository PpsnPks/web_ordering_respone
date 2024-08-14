import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, interval, of, switchMap, takeWhile, timeout } from 'rxjs';

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
    console.log("set_sumPrice", this.total);
    
  }

  get_sumPrice(){
    return this.total
  }

  get_product(id: any){
    return this.http.get('/api/product/', {params:{categoryId: id}})
  }

  get_order(){
    const id = sessionStorage.getItem('orderId')
    return this.http.get('/api/order/'+id)
  }
  
  add_order(data: any){
    return this.http.post('/api/order', data)
  }
  
  edit_order(data: any){
    const id = sessionStorage.getItem('orderId')
    return this.http.put('/api/order/'+id, data)
  }

  selectPayment(data: any){
    const id = sessionStorage.getItem('orderId')
    return this.http.post(`/api/order/${id}/payment`, data)
  }
  paidRoomService(){
    const orderId = sessionStorage.getItem('orderId')
    const orderPaymentId = sessionStorage.getItem('orderPaymentId')
    return this.http.post(`/api/order/${orderId}/paid-roomservice/${orderPaymentId}`, {})
  }
  paylater(){
    const orderId = sessionStorage.getItem('orderId')
    const orderPaymentId = sessionStorage.getItem('orderPaymentId')
    return this.http.post(`/api/order/${orderId}/paylater/${orderPaymentId}`, {})
  }
  paybyQR(){
    const orderId = sessionStorage.getItem('orderId')
    const orderPaymentId = sessionStorage.getItem('orderPaymentId')
    return this.http.post(`/api/order/${orderId}/payment/${orderPaymentId}`, {})
  }

  getCategory(){
    return this.http.get('/api/category')
  }

  check_statusQR() {
    //const token = localStorage.getItem('accessToken');
    // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MTYyOTM3MzcsImV4cCI6MTcxNjM4MDEzN30.052VPoFGCA-TnFPul7hEwscTnfRtPNwr-D2i9RKltFY"
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + token
    // });
    const checkInterval = 5000; // 5 วินาที
    const checkTimeout = 600000; // 10 นาที
    const id = sessionStorage.getItem('orderId')

    return interval(checkInterval).pipe(
      switchMap(() => this.http.get<any>('/api/order/' + id).pipe(//, { headers: headers }
        catchError(error => {
          console.error('API call failed:', error);
          return of(null);
        })
      )),
      takeWhile(response => response === null || response.orderStatus !== 'complete', true),
      timeout(checkTimeout),
      catchError(error => {
        console.error('Polling timed out:', error);
        return of(null);
      })
    );
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
