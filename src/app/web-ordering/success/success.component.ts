import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebOrderingService } from '../web-ordering.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';

@Component({
  selector: 'asha-success',
  standalone: true,
  imports: [
    WebOrderingBarComponent,
    CommonModule,
    FormsModule,
    MatFormFieldModule
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  all_total: any
  paid_total: any
  orderData: any = []
  num_order: any = 17
  sub_total: any = 970
  discount: any = -5
  vat: any = 67.55
  service: any = 96.5

  payment_type: any = ''
  title: any = ''
  orderNo: any = ''

  text_payment: any

  constructor(
    private _router: Router,
    private _service: WebOrderingService
  ){
    //this.all_total = this._service.get_sumPrice()

    //this.orderData = [
    //  {name: 'กาแฟสังขยา (CUSTARD COFFEE)', qty: 2, pricePerPiece: 65},
    //  {name: 'Americano', qty: 2, pricePerPiece: 65},
    //  {name: 'Cocoa', qty: 5, pricePerPiece: 50},
    //  {name: 'Mocca', qty: 4, pricePerPiece: 65},
    //  {name: 'Thai Tea', qty: 1, pricePerPiece: 50},
    //]
    this._service.get_order().subscribe({
      next:(resp: any)=> {
        //this.payment_type = resp.orderPayments[0].paymentMethod.type
        //console.log('resp=> successPage : ',resp.orderPayments[0].paymentMethod.type);
        this.title = 'คำสั่งซื้อเสร็จสมบูรณ์'
        this.paid_total = 0
        this.text_payment = 'ชำระภายหลัง'
        //if (this.payment_type == 'cash'){
        //  this.title = 'คำสั่งซื้อเสร็จสมบูรณ์'
        //  this.paid_total = 0
        //  this.text_payment = 'ชำระภายหลัง'
        //} else{
        //  this.title = 'ชำระเงินสำเร็จ'
        //  this.paid_total = resp.grandTotal
        //  if (this.payment_type == 'member')
        //    this.text_payment = 'Charge เข้าห้อง'
        //  else if (this.payment_type == 'thaiqr')
        //    this.text_payment = 'QR Promptpay'
        //}
        this.orderNo = resp.orderNo
        this.all_total = resp.grandTotal

        //เก็บค่าทำใบเสร็จ
        let sum_num_order = 0
        for (let i = 0; i < resp?.orderItems?.length; i++) {
          const order = resp.orderItems[i];
          let temp_order = {
            name: order.product.name, qty: order.quantity, pricePerPiece: order.price
          }
          sum_num_order += order.quantity
          this.orderData.push(temp_order)
        }
        this.num_order = sum_num_order ?? 0
        this.sub_total = resp.total ?? 0
        this.discount = resp.discount ?? 0
        this.vat = resp.vat ?? 0
        this.service = resp.serviceCharge ?? 0
      }
    })
  }

  next(){
    this._router.navigate(['/home'])
  }

  print(){
    console.log('print');
    const printContents = document.getElementById('print-section')?.innerHTML;
    if (printContents) {
      const popupWindow = window.open('', '_blank');
      if (popupWindow) {
        popupWindow.document.open();
        popupWindow.document.write(`
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>รายงานสินค้าคงเหลือ</title>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=TH+Sarabun&display=swap">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
              <style>
                body {
                  counter-reset: page;
                }

                @page {
                  counter-increment: page;
                }

                #page-count:after {
                  content: "หน้า: " counter(page);
                }

                @media print {

                    /* General styles */
                    html,
                    body,
                    h2, h5, h6, p {
                        font-family: 'TH Sarabun' !important;
                    }

                    p {
                        font-family: 'TH Sarabun' !important;
                        font-size: 12pt;
                    }

                    body {
                        writing-mode: horizontal-tb;
                        background: white;
                    }

                    body,
                    .page-body {
                        box-shadow: 0;
                    }

                    /* Container adjustments */
                    .container-fluid {
                        padding: 0 !important;
                        margin-left: 0 !important;
                    }

                    .container {
                        padding: 0 !important;
                        margin: 0 !important;
                    }

                    /* Page body styles */
                    .page-body {
                        background: white;
                        display: block;
                        margin: auto;
                        margin-top: 5.5rem;
                        box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
                        padding: 0.5cm;
                        page-break-before: always;
                        width: 100%;
                        height: auto;
                    }

                    /* Section and table styles */
                    .print-section {
                        page-break-inside: avoid;
                    }

                    table {
                        width: 100%;
                    }

                    th, td {
                        font-family: 'TH Sarabun' !important;
                        font-size: 12pt;
                        padding: 3px;
                        border-bottom: 1px dashed transparent;
                        //border-bottom: 1px solid #000000;
                        border-right: 1px solid transparent;
                        border-left: 1px solid transparent;
                    }
                      
                    tbody.report-content tr:not(:last-child)>td {
                      border-bottom: 1px dashed #000000;
                    }

                    thead {
                        font-weight: bold;
                        padding-top: 8px;
                        padding-bottom: 8px;
                        border-top: 1px solid #000000;
                        border-bottom: 1px solid #000000;
                    }

                    /* Footer styles */
                    #table-footer {
                        border-left: 1px solid transparent;
                        border-right: 1px solid transparent;
                        border-top: 1px solid black;
                    }

                    #table-footer td:first-child {
                        border: 1px dashed transparent;
                    }

                    #table-footer td:last-child{
                        border: 1px solid black;
                        border-right: 1px solid transparent;
                    }

                    #table-footer td:nth-last-child(2),
                    #table-footer td:nth-last-child(3),
                    #table-footer td:nth-last-child(4),
                    #table-footer td:nth-last-child(5),
                    #table-footer td:nth-last-child(6) {
                        border: 1px solid black;
                        border-right: 1px solid transparent;
                        border-left: 1px solid transparent;
                    }

                    @page {
                        size: auto;
                    }
                }

                /* General styles for non-print view */
                html,
                body,
                h2, h5, h6, p {
                    font-family: 'TH Sarabun' !important;
                }

                .img-header img {
                  height: 100px;
                  padding-right: 10px;
                }
              
                .img-header {
                  display: flex;
                  justify-content: center;
                }

                .text-center-header {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                }

                .text-left-header{
                  display: flex;
                  justify-content: start;
                  gap: 3rem;
                }

                table.report-container {
                    page-break-after: always;
                    border: none;
                }

                thead.report-header {
                    display: table-header-group;
                }

                tfoot.report-footer {
                    display: table-footer-group;
                }
              </style>
            </head>
            <body>

            <table class="report-container" style="border: none !important;">
                <thead class="report-header" style="border: none !important;">
                  <tr style="border: none !important;">
                    <th class="report-header-cell" style="border: none !important;">
                      <div class="header-info">
                        <div class="container-fluid">
                          <div class="img-header">
		                        <img class="h-[20px] w-[20px]" src="../../../assets/images/logo/Logo_Black.png" alt="logo">
                          </div>
                          <div class="text-center-header">
		                        <h2><b>Receipt</b></h2>
                          </div>
                          <div class="text-left-header">
                            <div>
                              <h6><b>Date </b></h6>
                              <h6><b>Receipt No. </b></h6>
                            </div>
		                        <div>
                              <h6>06-08-2024 17:33</h6>
                              <h6>${this.orderNo}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="report-content" style="border: none !important;">
                  <tr>
                    <td class="report-content-cell" style="border: none !important;">
                        <div class="main">
                        <div class="print-section">
                            ${printContents}
                        </div>
                        </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot class="report-header">
                  <tr style="display: flex; flex-direction: column; align-items: center;">
                    <td>***Thank YOU***</td>
                  </tr>
                  <tr style="display: flex;gap: 2rem;">
                    <td>
                      <p>Print DateTime</p>
                    </td>
                    <td>
                      <p>DATE 06-08-2024 17:33</p>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <script>
                window.onload = function() {
                  window.print();
                  window.onafterprint = function() {
                    window.close();
                  };
                };
              </script>
            </body>
          </html>
        `);
        popupWindow.document.close();
      }
    } else {
      console.error('No content found in #print-section');
    }
  }
}
