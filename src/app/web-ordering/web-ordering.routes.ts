import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SummaryOrderComponent } from './summary-order/summary-order.component';

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
] as Routes;
