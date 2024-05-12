import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toUpper } from 'lodash';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _branch: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }


  getBranchNames(): Observable<string[]> {
    return this.http.get<any[]>('/api/branch').pipe(
      tap((resp: any) => {
        // ทำอะไรก็ตามที่ต้องการกับข้อมูลที่ได้รับ ในที่นี้เราใช้ tap เพื่อนำข้อมูลไปใช้ใน service ได้ต่อ
      }),
      map((data: any[]) => data.map(branch => branch.name))
    );
  }
}
