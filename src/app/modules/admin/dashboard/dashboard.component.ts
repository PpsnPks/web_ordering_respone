import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTooltip,
    ApexStroke,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexGrid
} from "ng-apexcharts";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardService } from './dashboard.service';

type ApexXAxis1 = {
    type?: "category" | "datetime" | "numeric";
    categories?: any;
    labels?: {
      style?: {
        colors?: string | string[];
        fontSize?: string;
      };
    };
  };

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    colors: string[];
    legend: ApexLegend;
};



@Component({
    selector: 'dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [TranslocoModule, MatIconModule, MatButtonModule, MatRippleModule,
        MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule,
        NgFor, NgIf, MatTableModule, NgClass, CurrencyPipe, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
})
export class DashboardComponent {



    value1: string = '';
    value2: string = '';
    value3: string = '';
    value4: string = '';
    data: any;
    selectedFood: string;
    foods: any;
    branchNames: string[] = [];

    onSelect(food: string): void {
        if (food === 'บางนา') {
            this.value1 = '56';
            this.value2 = '4';
            this.value3 = '6'
            this.value4 = '30';
        }
        else if (food === 'bkk') {
            this.value1 = '78';
            this.value2 = '6';
            this.value3 = '12'
            this.value4 = '38';
        }
        else if (food === 'บางซื่อ') {
            this.value1 = '184';
            this.value2 = '13';
            this.value3 = '27'
            this.value4 = '45';
        }
        else if (food === 'ลาดกระบัง') {
            this.value1 = '88';
            this.value2 = '5';
            this.value3 = '12'
            this.value4 = '33';
        }
        else if (food === 'okt') {
            this.value1 = '34';
            this.value2 = '1';
            this.value3 = '12'
            this.value4 = '55';
        }


        else {

            // Clear the values if Pizza is not selected
            this.value1 = '0';
            this.value2 = '0';
            this.value3 = '0';
            this.value4 = '0';
        }
    }

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    public chartOptions2: Partial<ChartOptions>;
    public chartOptions3: Partial<ChartOptions>;
    selectedProject: string = 'ACME Corp. Backend App';

    constructor(private service: DashboardService) {

        this.value1 = '56';
        this.value2 = '4';
        this.value3 = '6';
        this.value4 = '30';
        this.selectedFood = 'บางนา'; // ตั้งค่าเริ่มต้นให้เป็น บางนา หรือค่าใดก็ได้ตามที่ต้องการ
        this.onSelect(this.selectedFood);



        this.chartOptions3 = {
            series: [
              {
                name: "distibuted",
                data: [21, 22]
              }
            ],
            chart: {
              height: 350,
              type: "bar",
              events: {
                click: function(chart, w, e) {
                  // console.log(chart, w, e)
                }
              }
            },
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            plotOptions: {
              bar: {
                columnWidth: "45%",
                distributed: true
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: false
            },
            grid: {
              show: false
            },
            xaxis: {
              categories: [
                ["เงินสด"],
                ["พร้อมเพย์"],


              ],
              labels: {
                style: {
                  colors: [
                    "#008FFB",
                    "#00E396",
                    "#FEB019",
                    "#FF4560",
                    "#775DD0",
                    "#546E7A",
                    "#26a69a",
                    "#D10CE8"
                  ],
                  fontSize: "12px"
                }
              }
            }
          };


        this.chartOptions2 = {
            series: [
              {
                name: "distibuted",
                data: [21, 22, 10, 28, 16]
              }
            ],
            chart: {
              height: 350,
              type: "bar",
              events: {
                click: function(chart, w, e) {
                  // console.log(chart, w, e)
                }
              }
            },
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            plotOptions: {
              bar: {
                columnWidth: "45%",
                distributed: true
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: false
            },
            grid: {
              show: false
            },
            xaxis: {
              categories: [
                ["ชานม"],
                ["ชาไทย"],
                ["ม่อคค่า"],
                ["ช้อคโกแลตปั่น"],
                ["นมหมีปั่น"],

              ],
              labels: {
                style: {
                  colors: [
                    "#008FFB",
                    "#00E396",
                    "#FEB019",
                    "#FF4560",
                    "#775DD0",
                    "#546E7A",
                    "#26a69a",
                    "#D10CE8"
                  ],
                  fontSize: "12px"
                }
              }
            }
          };







        this.chartOptions = {
            series: [
                {
                    name: "สาขา1",
                    data: [11, 31, 40, 28, 51, 42, 109, 100, 56, 43, 27, 67, 47, 27, 57, 83, 47, 26, 57, 97, 47, 58, 28]
                },
                {
                    name: "สาขา2",
                    data: [11, 11, 32, 45, 32, 34, 52, 41, 48, 97, 35, 65, 87, 94, 79, 39, 79, 57, 35, 53, 79, 59, 29,]
                },
                {
                    name: "สาขา3",
                    data: [11, 11, 38, 85, 32, 54, 22, 71, 75, 35, 68, 64, 79, 35, 57, 42, 58, 35, 79, 35, 24, 89, 100,]
                }

            ],
            chart: {
                height: 350,
                type: "area"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth"
            },
            xaxis: {
                type: "datetime",
                categories: [
                    "2018-09-19T00:00:00.000Z",
                    "2018-09-19T01:30:00.000Z",
                    "2018-09-19T02:30:00.000Z",
                    "2018-09-19T03:30:00.000Z",
                    "2018-09-19T04:30:00.000Z",
                    "2018-09-19T05:30:00.000Z",
                    "2018-09-19T06:30:00.000Z",
                    "2018-09-19T07:30:00.000Z",
                    "2018-09-19T08:30:00.000Z",
                    "2018-09-19T09:30:00.000Z",
                    "2018-09-19T10:30:00.000Z",
                    "2018-09-19T11:30:00.000Z",
                    "2018-09-19T12:30:00.000Z",
                    "2018-09-19T13:30:00.000Z",
                    "2018-09-19T14:30:00.000Z",
                    "2018-09-19T15:30:00.000Z",
                    "2018-09-19T16:30:00.000Z",
                    "2018-09-19T17:30:00.000Z",
                    "2018-09-19T18:30:00.000Z",
                    "2018-09-19T19:30:00.000Z",
                    "2018-09-19T20:30:00.000Z",
                    "2018-09-19T21:30:00.000Z",
                    "2018-09-19T22:30:00.000Z",
                    "2018-09-19T23:00:00.000Z",
                ]
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm"
                }
            }
        };






    }
    ngOnInit(): void {
        this.service.getBranchNames().subscribe(names => {
            this.branchNames = names;
            // ทำอะไรก็ตามที่ต้องการกับข้อมูลชื่อสาขา ในที่นี้เราเพียงแสดงผลในคอนโซลเท่านั้น
            this.foods = this.branchNames;
        });
    }

    public generateData(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }



}
