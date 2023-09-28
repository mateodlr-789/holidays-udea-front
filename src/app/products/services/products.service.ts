import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiPagination, ApiPaginationResponse, ApiResponse } from 'src/app/utils/interfaces/api';
import { CreateProduct, Product, UpdateProduct } from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = `${environment.api}/products`;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private paginationSubject = new BehaviorSubject<ApiPagination>({
    total: 0,
    totalPages: 1,
    hasMorePages: false,
    currentPage: 1,
    limit: 10
  });

  products$ = this.productsSubject.asObservable();
  pagination$ = this.paginationSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {

    this.http.get<ApiPaginationResponse<Product[]>>(`${this.API_URL}?limit=${this.paginationSubject.value.limit}&page=${this.paginationSubject.value.currentPage}`)
      .subscribe(response => {
        this.productsSubject.next(response.data);
        const { data, ok, errorMessage, ...pagination } = response;
        this.paginationSubject.next(pagination);
      }
    );
    
    return this.products$;
  }

  public setPagination(pagination: Partial<ApiPagination>): void {
    const currentPagination = this.paginationSubject.value;
    this.paginationSubject.next({ ...currentPagination, ...pagination });
    this.getProducts();
  }

  public getProductById(id: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.API_URL}/${id}`);
  }

  public createProduct(product: CreateProduct) {
    const { name, description, image, price, sku, stock, tags } = product;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('price', price.toString());
    formData.append('sku', sku);
    formData.append('stock', stock.toString());
    tags.forEach(tag => formData.append('tags', tag));

    return this.http.post<ApiResponse<Product>>(this.API_URL, formData);
  }

  public updateProduct(productId: string, product: UpdateProduct) {
    const { name, description, image, price, sku, stock, tags } = product;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('sku', sku);
    formData.append('stock', stock.toString());
    tags.forEach(tag => formData.append('tags', tag));
    if (image) formData.append('image', image);
    
    return this.http.put<ApiResponse<Product>>(`${this.API_URL}/${productId}`, formData);
  }

}
