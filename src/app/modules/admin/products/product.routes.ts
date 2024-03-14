import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { inject } from '@angular/core';
import { ProductService } from './product.service';

export default [
    {
        path: '',
        component: ProductsComponent,
        resolve  : {
            categories: () => inject(ProductService).getCategories(),
            // products  : () => inject(InventoryService).getProducts(),
        },
    },
] as Routes;
