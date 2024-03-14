import { ProductService } from '../../product.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
    MatDialog,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogRef,
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

@Component({
    selector: 'app-product-compose',
    standalone: true,
    templateUrl: './product-compose.component.html',
    styleUrl: './product-compose.component.scss',
    imports: [CommonModule, DataTablesModule, MatIconModule, MatFormFieldModule, MatInputModule,
        FormsModule, MatToolbarModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions,
        MatDialogClose, MatSelectModule, FilePickerModule, NgxMaskDirective, ReactiveFormsModule
    ]
})
export class ProductComposeComponent implements OnInit {
    form: FormGroup;
    adapter = new DemoFilePickerAdapter(this.http);
    catagories: any[] = [];

    constructor(
        private dialogRef: MatDialogRef<ProductComposeComponent>,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        public ProductService: ProductService,
        private http: HttpClient,
    ) { }

    ngOnInit(): void {
        this.form = this.FormBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            price: ['', Validators.required],
            image: [''],
            categoryId: ['', Validators.required],
        });

        this.ProductService.categories$.subscribe(resp => this.catagories = resp);
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
        }).subscribe(
            {
                next: (resp: any) => {
                    this.dialogRef.close()
                }
            }
        )

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
