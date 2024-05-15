import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DataTablesModule } from 'angular-datatables';
import { DataTableDirective} from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportService } from '../page.service';
import { MatSelectModule } from '@angular/material/select';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { environment } from 'environments/environment.development';
import { Subject } from 'rxjs';
import { createFileFromBlob } from 'app/modules/shared/helper';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-card-report',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    MatSelectModule,
    MatCardModule,],
  templateUrl: './card-report.component.html',
  styleUrl: './card-report.component.scss'
})
export class CardReportComponent {
[x: string]: any;
  dtOptions: DataTables.Settings = {};
  orders: any[] = [];
  dtElement: DataTableDirective;
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  constructor(
      private _service : ReportService,
      public dialog: MatDialog,
      private _changeDetectorRef: ChangeDetectorRef,
      private _fuseConfirmationService: FuseConfirmationService,
      private _fb: FormBuilder,
  ) {

       
  }
  ngOnInit(): void {
    
}

printOriginal() {
  this._service.orderPdf().subscribe({
    next: (resp) => {
      createFileFromBlob(resp)
    },
    error: (err) => {
      alert(JSON.stringify(err))
    }
  })
}


}
