import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import {FormControl, FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ExampleService } from './example.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};



@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports        : [TranslocoModule, MatIconModule, MatButtonModule, MatRippleModule,
      MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule,
      NgFor, NgIf, MatTableModule, NgClass, CurrencyPipe,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
})
export class ExampleComponent
{
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
  selectedProject: string = 'ACME Corp. Backend App';
  constructor(private service: ExampleService,) {

    this.value1 = '56';
    this.value2 = '4';
    this.value3 = '6';
    this.value4 = '30';
    this.selectedFood = 'บางนา'; // ตั้งค่าเริ่มต้นให้เป็น บางนา หรือค่าใดก็ได้ตามที่ต้องการ
    this.onSelect(this.selectedFood);

    this.chartOptions = {
      series: [
        {
          name: "สาขา1",
          data: [11, 31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "สาขา2",
          data: [11, 11, 32, 45, 32, 34, 52, 41]
        },
        {
          name: "สาขา3",
          data: [11, 11, 38, 85, 32, 54, 22, 71]
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
          "2018-09-19T06:30:00.000Z"
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
        console.log(this.branchNames);
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
