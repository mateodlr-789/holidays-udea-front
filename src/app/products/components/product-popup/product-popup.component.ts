import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.css']
})
export class ProductPopupComponent {

  public productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    sku: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    image: [null, [Validators.required]],
  });
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public popupTitle: string = "Crear producto";
  public tags: string[] = [];
  public image: File | null = null;
  public announcer = inject(LiveAnnouncer);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductPopupComponent>,
    private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data.isUpdate) {
      this.popupTitle = "Editar producto";
      this.tags = this.data.productData.tags;
      this.productForm.patchValue(this.data.productData);
      this.productForm.controls['image'].removeValidators(Validators.required);
    }
    
  }

  public isValidField(field: string): boolean {
    return this.productForm.controls[field].invalid 
      && this.productForm.controls[field].touched;
  }

  public getFieldError(field: string): string | null {
    const control = this.productForm.controls[field];
    if (!control) return null;
    
    const errors = control.errors ?? {};
  
    if ('required' in errors) {
      return 'Este campo es requerido';
    }
  
    if ('minlength' in errors) {
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    }

    if ('min' in errors) {
      return `Mínimo ${errors['min'].min}`;
    }
    
    return null;
  }

  public onSave(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (!this.data.isUpdate) {
      this.productsService.createProduct({...this.productForm.value, tags: this.tags}).subscribe((product) => {
        this.closePopup(true);
      });
    }

    this.productsService.updateProduct(this.data.productData._id, {...this.productForm.value, tags: this.tags}).subscribe((product) => {
      this.closePopup(true);
    });
  }

  public closePopup(reload: boolean = false): void {
    this.dialogRef.close(reload);
  }

  public addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) this.tags.push(value);
    event.chipInput!.clear();
  }

  public removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
    }
  }

  public editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeTag(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  public uploadFile(event: Event){
    const inputElement = event.target as HTMLInputElement;
    this.image = inputElement.files?.[0] ?? null;
    this.productForm.controls['image'].setValue(this.image);
  }

}
