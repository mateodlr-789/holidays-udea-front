import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  public filterForm: FormGroup = this.fb.group({
    filterBy: [''],
    orderBy: [''],
    search: ['']
  });
  public filterOptions = [
    { value: 'name', label: 'Nombre' },
    { value: 'sku', label: 'Sku' }
  ];
  public orderByOptions = [
    { value: 'price', label: 'Precio' },
    { value: 'createdAt', label: 'Fecha de creación' },
    { value: 'updatedAt', label: 'Fecha de actualización' }
  ];

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  public onFilter() {
    this.productsService.getProducts(this.filterForm.value).subscribe();
  }

  public resetFilters() {
    this.filterForm.reset();
  }

}
