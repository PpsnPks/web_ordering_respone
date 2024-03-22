import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ProductsComponent } from './page.component';

export default [
    {
        path: '',
        component: ProductsComponent,
    
    },
    {
        path: 'form',
        component: FormComponent,
 
    },
    {
        path: 'form/:id',
        component: FormComponent,
 
    },
] as Routes;
