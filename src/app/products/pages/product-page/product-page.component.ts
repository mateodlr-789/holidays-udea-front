import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/products';
import { MatDialog } from '@angular/material/dialog';
import { ProductPopupComponent } from '../../components/product-popup/product-popup.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  public productId: string = "";
  public product: Product | null = null;
  public isLoading: boolean = true;
  public defaultImageUrl = '../../assets/images/common/noImage.jpg';

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.productId = params['id'] ?? "";

      if (this.productId === "") {
        this.isLoading = false;
        return;
      }
      
      this.loadProduct();
    });
  }

  public async loadProduct() {
    this.isLoading = true;
    this.productsService.getProductById(this.productId).subscribe((product) => {
      this.product = product.data;
    });
    this.isLoading = false;
  }

  public async updateProduct() {
    const dialogRef = this.dialog.open(ProductPopupComponent, {
			width: '475px',
			height: '550px',
			data: {
        title: 'Actualizar producto',
        isUpdate: true,
        productData: this.product
			}
		});
		dialogRef.afterClosed().subscribe((reload) => {
      if (reload) this.loadProduct();
		});
  }

  public goToProducts() {
    this.router.navigate(['/products']);
  }

  public async deleteProduct() {
    this.productsService.deleteProduct(this.productId).subscribe(() => {
      this.goToProducts();
    });
  }
}
