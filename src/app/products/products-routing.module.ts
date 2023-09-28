import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { 
        path: 'list', 
        component: ListPageComponent 
      },
      { 
        path: ':id', 
        component: ProductPageComponent 
      },
      { 
        path: '', 
        redirectTo: 'list',
        pathMatch: 'full'
      },
      { 
        path: '**', 
        redirectTo: 'list' 
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
