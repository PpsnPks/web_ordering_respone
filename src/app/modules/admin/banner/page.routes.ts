import { Routes } from '@angular/router';
import { BannerComponent } from './page.component';
import { FormComponent } from './form/form.component';
import { BannerService } from '../banners/banner.service';
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
