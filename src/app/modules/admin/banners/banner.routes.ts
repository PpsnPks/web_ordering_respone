import { Routes } from '@angular/router';
import { BannersComponent } from './banners.component';
import { inject } from '@angular/core';
import { BannerService } from './banner.service';

export default [
    {
        path: '',
        component: BannersComponent,
        resolve  : {
            categories: () => inject(BannerService).getCategories(),
            // products  : () => inject(InventoryService).getProducts(),
        },
    },
] as Routes;
