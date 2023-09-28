import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';

import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { FiltersComponent } from './components/filters/filters.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductPopupComponent } from './components/product-popup/product-popup.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CatalogueComponent,
    FiltersComponent,
    LayoutPageComponent,
    ListPageComponent,
    ProductPageComponent,
    ProductPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ProductsModule { }
