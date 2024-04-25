import { Routes } from '@angular/router';
import { BannerComponent } from './banner.component';
import { FormComponent } from './form/form.component';
import { inject } from '@angular/core';

export default [
    {
        path     : '',
        component: BannerComponent,
        resolve  : {
            // categories: () => inject(BannerService).getCategories(),
            // units: () => inject(BannerService).getUnit(),
            // products  : () => inject(InventoryService).getProducts(),
        },
    },
    {
        path     : 'form',
        component: FormComponent,
    },
] as Routes;
