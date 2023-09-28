import { Component } from '@angular/core';

import { ApiPagination } from 'src/app/utils/interfaces/api';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Product } from '../../interfaces/products';
import { ProductsService } from '../../services/products.service';
import { ProductPopupComponent } from '../product-popup/product-popup.component';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {

  // public products = [
  //   {
  //     nombre: 'Producto 1',
  //     sku: 'SKU-1',
  //     precio: 19.99,
  //     stock: 10,
  //     imagenUrl: 'https://viraly-production-product-upload.s3.amazonaws.com/media_elements/M_ojG9UCIAn4CX7PPnd70.png',
  //     etiquetas: ['Etiqueta 1', 'Etiqueta 2']
  //   },
  //   {
  //     nombre: 'Producto 2',
  //     sku: 'SKU-2',
  //     precio: 29.99,
  //     stock: 5,
  //     imagenUrl: 'https://viraly-production-product-upload.s3.amazonaws.com/media_elements/M_ojG9UCIAn4CX7PPnd70.png',
  //     etiquetas: ['Etiqueta 3', 'Etiqueta 4']
  //   },{
  //     nombre: 'Producto 2',
  //     sku: 'SKU-2',
  //     precio: 29.99,
  //     stock: 5,
  //     imagenUrl: 'https://viraly-production-product-upload.s3.amazonaws.com/media_elements/M_ojG9UCIAn4CX7PPnd70.png',
  //     etiquetas: ['Etiqueta 3', 'Etiqueta 4']
  //   },{
  //     nombre: 'Producto 2',
  //     sku: 'SKU-2',
  //     precio: 29.99,
  //     stock: 5,
  //     imagenUrl: 'https://viraly-production-product-upload.s3.amazonaws.com/media_elements/M_ojG9UCIAn4CX7PPnd70.png',
  //     etiquetas: ['Etiqueta 3', 'Etiqueta 4']
  //   },{
  //     nombre: 'Producto 2',
  //     sku: 'SKU-2',
  //     precio: 29.99,
  //     stock: 5,
  //     imagenUrl: 'https://viraly-production-product-upload.s3.amazonaws.com/media_elements/M_ojG9UCIAn4CX7PPnd70.png',
  //     etiquetas: ['Etiqueta 3', 'Etiqueta 4']
  //   },
  //   // Agrega más productos aquí
  // ];
  public products: Product[] = [];
  public pagination: ApiPagination = {
    total: 0,
    totalPages: 1,
    hasMorePages: false,
    currentPage: 1,
    limit: 10
  };
  public readonly defaultImageUrl = '../../assets/images/common/noImage.jpg';
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.productsService.pagination$.subscribe((pagination) => {
      this.pagination = pagination;
    })
  }

  public async createProduct() {
    const dialogRef = this.dialog.open(ProductPopupComponent, {
			width: '475px',
			height: '550px',
			data: {
        title: 'Crear producto',
        isUpdate: false,
        productData: {}
			}
		});
		dialogRef.afterClosed().subscribe((reload) => {
      if (reload) this.loadProducts();
		});
  }

  public loadProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  public handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.productsService.setPagination({
      limit: e.pageSize,
      currentPage: e.pageIndex+1
    })
  }

}
