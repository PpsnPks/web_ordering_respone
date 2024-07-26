import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ReportListService } from './report-list.service';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogForm } from './form-dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-page-report-list',
    standalone: true,
    imports: [
        CommonModule,
        DataTablesModule,
        MatButtonModule,
        MatIconModule,
        FilePickerModule,
        MatMenuModule,
        MatDividerModule
    ],
    templateUrl: './report-list.component.html',
    styleUrl: './report-list.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ReportListComponent implements OnInit, AfterViewInit {
    dtOptions: any = {};
    dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
    @ViewChild('btNg') btNg: any;
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    branch: any[] = []

    reportList: any[] = [
        {
            code: 'remainCreditDaily',
            name: 'รายงาน ยอดเงินคงเหลือของแต่ละบัตรแยกข้อมูลตามวัน (รายวัน)',
            type: [
                'date-rang',
            ],
            extension: [
                'excel'
            ]
        },
        {
            code: 'paymentTopup',
            name: 'รายงานประวัติการเติมเงินแต่ละบัตร',
            type: [
                'date-rang',
                'wallet-type',
            ],
            extension: [
                'excel'
            ]
        },
    ]
    constructor(
        private _service: ReportListService,
        private fuseConfirmationService: FuseConfirmationService,
        private toastr: ToastrService,
        public dialog: MatDialog,
        private activated: ActivatedRoute

    ) {
        this.branch = this.activated.snapshot.data.branch;
        // console.log(this.branch);
        
    }
    ngOnInit(): void {
      

    }

    ngAfterViewInit() {
     
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
   
    }

    openDialogReport(item: any) {
        const DialogRef = this.dialog.open(DialogForm, {
            disableClose: true,
            width: '500px',
            height: 'auto',
            enterAnimationDuration: 300,
            exitAnimationDuration: 300,
            data: {
                value: item,
                branch: this.branch
            }
        });
        DialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result, 'result')
                // this.rerender();
            }
        });
    }



   
}
