import { chats } from './../../../mock-api/apps/chat/data';
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
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTooltip, ApexStroke, ApexPlotOptions, ApexYAxis, ApexLegend, ApexGrid } from "ng-apexcharts";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardService } from './dashboard.service';
import { items } from 'app/mock-api/apps/file-manager/data';

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
    imports: [
        TranslocoModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatMenuModule,
        MatTabsModule,
        MatButtonToggleModule,
        NgApexchartsModule,
        NgFor,
        NgIf,
        MatTableModule,
        NgClass,
        CurrencyPipe,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule
    ],
})
export class DashboardComponent {

    value1: any;
    value2: string = '';
    value3: string = '';
    value4: string = '';
    data: any;
    selectedFood: string;
    foods: any;
    branchNames: string[] = [];
    Dashboard: any;
    total: any;
    bill: any;
    avg: any;
    paymentType: any;
    productValue: any;
    productName: any;
    chartValue: any;
    datetime: any;

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    public chartOptions2: Partial<ChartOptions>;
    public chartOptions3: Partial<ChartOptions>;
    selectedProject: string = 'ACME Corp. Backend App';

    constructor(private service: DashboardService) {
        this.value1 = this.total;
        this.value2 = '4';
        this.value3 = '6';
        this.value4 = '30';
        // Set initial value for selectedFood or any other initialization logic
        this.onSelect(this.selectedFood);

        this.chartOptions3 = {
            series: [
                {
                    name: "distibuted",
                    data: []
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
                    data: []
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
                categories: ["กาแฟ", "ชาเย็น", "ชาเขียว", "ชามะนาว", "ชาดำ"],
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


        this.service.getDashboard().subscribe(resp => {
            console.log('seedata', resp);
            this.paymentType = resp.paymentType.map(item => item.value);
            this.total = resp.total;
            this.bill = resp.bill;
            this.avg = resp.avg;
            this.chartValue = resp.chart.map(item => item.value);
            this.productValue = resp.product.map(item => item.value);
            this.productName = resp.product.map(item => item.name);
            this.datetime = resp.chart.map(item => item.datetime);
            this.chartOptions2.xaxis.categories = this.productName;
            this.chartOptions.xaxis.categories = this.datetime;
            this.chartOptions.series= [{
                name: "distibuted",
                data: this.chartValue
            }];
            this.chartOptions3.series = [{
                name: "distibuted",
                data: this.paymentType
            }];
            this.chartOptions2.series = [{
                name: "distibuted",
                data: this.productValue
            }];
        });
        this.service.getBranchNames().subscribe(names => {
            this.branchNames = names;
            this.foods = this.branchNames;
        });

    }

    onSelect(food: string): void {
        this.value1 = this.total;
        this.value2 = '4';
        this.value3 = '6';
        this.value4 = '30';
    }

    public generateData(baseval, count, yrange) {
        let i = 0;
        const series = [];
        while (i < count) {
            const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
            const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }
}
