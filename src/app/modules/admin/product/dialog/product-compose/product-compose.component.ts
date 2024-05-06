import { ProductService } from '../../../products/product.service';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, Validators, FormArray } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from 'app/demo-file-picker.adapter';
import { NgxMaskDirective } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-compose',
  standalone: true,
  templateUrl: './product-compose.component.html',
  styleUrl: './product-compose.component.scss',
  imports: [CommonModule, DataTablesModule, MatIconModule, MatFormFieldModule, MatInputModule,
    FormsModule, MatToolbarModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions,
    MatDialogClose, MatSelectModule, FilePickerModule, NgxMaskDirective, ReactiveFormsModule, MatTabsModule,
    MatDividerModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
})
export class ProductComposeComponent implements OnInit {
  selectedValue: string;
  form: FormGroup;
  adapter = new DemoFilePickerAdapter(this.http);
  catagories: any[] = [];
  units: any[] = [];
  title: string
  delete_toggle: boolean
  attForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ProductComposeComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public ProductService: ProductService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: [''],
      categoryId: ['', Validators.required],
      unitId: ['', Validators.required],
    });

    this.attForm = this.fb.group({
      attributes: this.fb.array([])
    });



    if (this.data.type === 'NEW') {
      this.title = "เพิ่มสินค้า"

      this.addAttribute()

    } else if (this.data.type === 'EDIT') {
      this.title = "แก้ไขสินค้า"

      this.form = this.fb.group({
        code: this.data.value.code ?? '',
        name: this.data.value.name ?? '',
        price: this.data.value.price ?? '',
        image: this.data.value.image ?? '',
        categoryId: this.data.value.category.id ?? '',
        unitId: this.data.value.unit.id ?? '',
      });
    }

    this.delete_toggle = this.form.value.image
    this.ProductService.categories$.subscribe(resp => this.catagories = resp);
    this.ProductService.units$.subscribe(resp => this.units = resp);
  }

  attributes(): FormArray {
    return this.attForm.get('attributes') as FormArray
  }

  attributeValues(index: number): FormArray {
    return this.attributes().at(index).get('attributeValues') as FormArray
  }

  addAttribute(data?: any) {
    const g = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      type: ['', Validators.required],
      attributeValues: this.fb.array([])
    })

    this.attributes().push(g)
  }

  addAttValue(index: number, data?: any) {
    const g = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: ['', Validators.required],
    })

    this.attributeValues(index).push(g)
  }

  removeAttribute(index: number) {
    this.attributes().removeAt(index)
  }

  removeAttValue(i: number, j: number) {
    this.attributeValues(i).removeAt(j)
  }

  Submit() {
    if (confirm('Are you sure you want to save')) {
      this.ProductService.create({
        code: this.form.value.code,
        name: this.form.value.name,
        price: this.form.value.price,
        image: this.form.value.image,
        categoryId: this.form.value.categoryId,
        unitId: this.form.value.unitId,
        attributes: this.attForm.value.attributes,
      }).subscribe({
        next: (resp: any) => {
          this.dialogRef.close()
        }
      }
      )
    }
  }

  uploadSuccess(event): void {
    this.form.patchValue({
      image: event.uploadResponse.filename
    });
  }

  onSelectChange(event: any) {

  }
}
