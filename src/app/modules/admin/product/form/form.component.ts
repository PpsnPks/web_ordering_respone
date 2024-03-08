

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomersService } from '../../customers/customers.service';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from '../page.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'form-product',
    templateUrl: './form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule, NgClass, MatInputModule, TextFieldModule, ReactiveFormsModule, MatButtonToggleModule, MatButtonModule, MatSelectModule, MatOptionModule, MatChipsModule, MatDatepickerModule],
})
export class FormComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    form: FormGroup;

    level: any[] = [];
    unit: any[] = []
    category: any[] = []
    Id: string;
    itemData: any
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _serviceCustomer: CustomersService,
        private _service: ProductService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.Id = this._activatedRoute.snapshot.paramMap.get('id');
        this.form = this._formBuilder.group({
            id: '',
            code: '',
            name: '',
            unitId: '',
            imgeUrl: '',
            categoryId: '',
            productLevel: this._formBuilder.array([])
        })
        this._service.getUnit().subscribe((resp: any) => {
            this.unit = resp
        })
        this._service.getCategory().subscribe((resp: any) => {
            this.category = resp
        })
        this._service.getById(this.Id).subscribe((resp: any) => {
            this.itemData = resp
        })
    }

    ngOnInit(): void {
        if (this.Id) {
            this._service.getById(this.Id).subscribe((resp: any) => {
                this.itemData = resp
                if (this.itemData) {
                    this.form.patchValue({
                        ...this.form,
                        imgeUrl: '',
                        unitId: +this.itemData.unit.id,
                        categoryId: +this.itemData?.category?.id,
                    })
                    this.itemData.productLevel.forEach(element => {
                        const a = this._formBuilder.group({
                            id: element.id,
                            levelId: element.level.id,
                            levelName: element.level.name,
                            price: element.price
                        })
                        this.productLevel().push(a);
                    });
                }
            })
        } else {
            this._serviceCustomer.getLevel().subscribe((resp: any) => {
                this.level = resp
                if (this.level) {
                    this.level.forEach((data: any) => {
                        const a = this._formBuilder.group({
                            id: '',
                            levelId: data.id,
                            levelName: data.name,
                            price: ''
                        })
                        this.productLevel().push(a);
                    })
                }
            })
        }

    }

    productLevel(): FormArray {
        return this.form.get('productLevel') as FormArray
    }

    addPriceLevel(): FormGroup {
        return this._formBuilder.group({
            id: '',
            levelId: '',
            price: ''
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }

    onSaveClick(): void {

    }
}

