import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SummaryOrderComponent } from './summary-order/summary-order.component';
import { PaymentComponent } from './payment/payment.component';
import { PayComponent } from './pay/pay.component';
import { SuccessComponent } from './success/success.component';

export default [
    {
        path     : 'login',
        component: LoginComponent,
    },
    {
        path     : 'home',
        component: HomeComponent,
    },
    {
        path     : 'summary-order',
        component: SummaryOrderComponent,
    },
    {
        path     : 'payment',
        component: PaymentComponent,
    },
    {
        path     : 'payment/pay',
        component: PayComponent,
    },
    {
        path     : 'payment/pay/success',
        component: SuccessComponent,
    },
] as Routes;
