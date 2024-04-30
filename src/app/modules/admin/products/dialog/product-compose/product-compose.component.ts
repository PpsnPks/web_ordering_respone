import { ProductService } from '../../product.service';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
    MatDialog,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { ValidationError, FilePickerModule } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from 'app/demo-file-picker.adapter';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
    selector: 'app-product-compose',
    standalone: true,
    templateUrl: './product-compose.component.html',
    styleUrl: './product-compose.component.scss',
    imports: [CommonModule, DataTablesModule, MatIconModule, MatFormFieldModule, MatInputModule,
        FormsModule, MatToolbarModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions,
        MatDialogClose, MatSelectModule, FilePickerModule, NgxMaskDirective, ReactiveFormsModule,MatTabsModule
    ],
    providers: [
      {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    ]
})
export class ProductComposeComponent implements OnInit {
    form: FormGroup;
    adapter = new DemoFilePickerAdapter(this.http);
    catagories: any[] = [];
    units: any[] = [];
    title: string
    delete_toggle: boolean

    constructor(
        private dialogRef: MatDialogRef<ProductComposeComponent>,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        public ProductService: ProductService,
        private http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.form = this.FormBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            price: ['', Validators.required],
            image: [''],
            categoryId: ['', Validators.required],
            unitId: ['', Validators.required],
        });

        if (this.data.type === 'NEW'){
            this.title = "เพิ่มสินค้า"
        }else if (this.data.type === 'EDIT'){
            this.title = "แก้ไขสินค้า"
            this.form.patchValue({
                code: this.data.value.code,
                name: this.data.value.name,
                price: this.data.value.price,
                image: this.data.value.image,
                categoryId: this.data.value.category.id,
                unitId: this.data.value.unit.id,
              });
        }

        this.delete_toggle = this.form.value.image
        this.ProductService.categories$.subscribe(resp => this.catagories = resp);
        this.ProductService.units$.subscribe(resp => this.units = resp);
    }

    Submit() {
        if (this.form.invalid) {
            return;
        }
        this.ProductService.create({
            code: this.form.value.code,
            name: this.form.value.name,
            price: this.form.value.price,
            image: this.form.value.image,
            categoryId: this.form.value.categoryId,
            unitId: this.form.value.unitId,
        }).subscribe(
            {
                next: (resp: any) => {
                    this.dialogRef.close()
                }
            }
        )

    }

    deleteImgToInsert(){
        //this.delete_toggle = false
        this.delete_toggle = !this.delete_toggle
        console.log("please insert image");

    }

    uploadSuccess(event): void {
        // console.log(event);
        this.form.patchValue({
            image: event.uploadResponse.filename
        });
    }

    onValidationError(error: ValidationError): void {
        alert(`Validation Error ${error.error} in ${error.file?.name}`);
    }

}
