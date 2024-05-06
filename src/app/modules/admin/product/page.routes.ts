import { Routes } from '@angular/router';
import { ProductComponent } from './page.component';
import { FormComponent } from './form/form.component';
import { inject } from '@angular/core';
import { ProductService } from './product.service';


export default [
  {
    path: '',
    component: ProductComponent,
    resolve: {
      categories: () => inject(ProductService).getCategories(),
      units: () => inject(ProductService).getUnit(),
      // products  : () => inject(InventoryService).getProducts(),
    },
  },
  {
    path: 'form',
    component: FormComponent,
  },

] as Routes;
