import { Routes } from '@angular/router';
import { ReportComponent } from './summry-report/report.component';
import { ReportPaymentTypeComponent } from './payment-type/report.component';
import { ReportSalerComponent } from './saler/report.component';
import { CompactComponent } from './compact.component';


export default [
    {
        path     : 'total',
        component: ReportComponent,
    },
    {
        path     : 'payment-type',
        component: ReportPaymentTypeComponent,
    },
    {
        path     : 'saler',
        component: ReportSalerComponent,
    },
    {
        path     : 'print/:id',
        component: CompactComponent,
    },
] as Routes;
