import { Routes } from '@angular/router';
import { CategoryComponent } from './page.component';
import { FormComponent } from './form/form.component';

export default [
    {
        path: '',
        component: CategoryComponent,
    
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
