// useReal
import { ToastrService } from 'ngx-toastr';
import { categories } from './../../mock-api/apps/academy/data';
import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { WebOrderingBarComponent } from '../web-ordering-bar/web-ordering-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
    MatBottomSheet,
    MatBottomSheetModule,
    MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { PromotionBsComponent } from './promotion-bs/promotion-bs.component';
import { AddProductComponent } from './add-product/add-product.component';
import localeTh from '@angular/common/locales/th';
import { WebOrderingService } from '../web-ordering.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';

registerLocaleData(localeTh);
@Component({
    selector: 'asha-home',
    standalone: true,
    providers: [
        { provide: LOCALE_ID, useValue: 'th-TH' }, // ตั้งค่า locale ให้เป็น 'th-TH'
    ],
    imports: [
        CommonModule,
        WebOrderingBarComponent,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatBottomSheetModule,
        MatDialogModule,
        DecimalPipe,
        MatIconModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    selected: any = '';
    items: any = [];
    all_product = [];
    all_items: any = [];
    filter_items: any = [];
    all_order: any = 0;
    all_price: any = 0;

    filterSearch: any = 'filter';
    text_search: any = '';
    categories: any; // = [
    //  {name: "สินค้าทั้งหมด", id: ''},
    //  {name: "เครื่องดื่ม", id: 0},
    //  {name: "อาหาร", id: 1},
    //  {name: "โปรโมชั่น", id: 2},
    //]
    order_selected: any = [];
    priceAddOn: any = 0;

    bottomSheetRef?: MatBottomSheetRef;
    dialogRef?: MatDialogRef<any>;

    constructor(
        private _router: Router,
        public breakpointObserver: BreakpointObserver,
        public bottom: MatBottomSheet,
        public dialog: MatDialog,
        private _service: WebOrderingService,
        private toastr: ToastrService
    ) {
        //this.all_items = [
        //  {
        //    product_img: "../../../assets/ordering/mock_img.png",
        //    product_name: "Matcha Latte",
        //    product_price: "85.00",
        //    order: 0
        //  },
        //  {
        //    product_img: "../../../assets/ordering/mock_img.png",
        //    product_name: "Matcha Latte",
        //    product_price: "85.00",
        //    order: 0
        //  },
        //  {
        //    product_img: "../../../assets/ordering/mock_img.png",
        //    product_name: "Matcha Latte",
        //    product_price: "85.00",
        //    order: 0
        //  },
        //  {
        //    product_img: "../../../assets/ordering/mock_img.png",
        //    product_name: "Matcha Latte",
        //    product_price: "85.00",
        //    order: 0
        //  },
        //  {
        //    product_img: "../../../assets/ordering/mock_img.png",
        //    product_name: "Matcha Latte",
        //    product_price: "85.00",
        //    order: 0
        //  },
        //  {
        //    product_img: "../../../assets/ordering/mock_img.png",
        //    product_name: "Matcha Latte",
        //    product_price: "85.00",
        //    order: 0
        //  },
        //  {
        //    product_img: "../../../assets/ordering/mock_img.png",
        //    product_name: "Matcha Latte",
        //    product_price: "85.00",
        //    order: 0
        //  },
        //  {
        //    product_img: "../../../assets/ordering/mock_img.png",
        //    product_name: "Matcha Latte",
        //    product_price: "85.00",
        //    order: 0
        //  },
        //  {
        //    product_img: "../../../assets/ordering/mock_img.png",
        //    product_name: "Matcha Latte",
        //    product_price: "85.00",
        //    order: 0
        //  },
        //]

        //useReal
        // this._service.getCategory().subscribe({
        //   next:(resp: any)=> {
        //     this.categories = resp
        //   }
        // })
        this.categories = [
            { name: 'เครื่องดื่ม', id: 0 },
            { name: 'อาหาร', id: 1 },
            { name: 'โปรโมชั่น', id: 2 },
        ];
        this.getProduct('');
    }

    getProduct(id: any) {
        let data = [
            {
                c_id: 1,
                product_id: 0,
                product_img: '../../../assets/ordering/joke.jpg',
                name: 'โจ๊ก',
                product_price: 30,
                order: 0,
                attributes: [
                    {
                        name: 'เนื้อสัตว์',
                        type: 'single',
                        productAttributeValues: [
                            { name: 'อกไก่', price: 0 },
                            { name: 'หมู', price: 0 },
                            { name: 'ปลา', price: 10 },
                            { name: 'กุ้ง', price: 10 },
                        ],
                    },
                ],
            },
            {
                c_id: 0,
                product_id: 1,
                product_img: '../../../assets/ordering/cafeSom.png',
                name: 'กาแฟอเมริกาโน่ส้ม',
                product_price: 40,
                order: 0,
                attributes: [
                    {
                        name: 'เพิ่มช็อตกาแฟ',
                        type: 'quantity',
                        productAttributeValues: [
                            {
                                name: 'กาแฟเข้มข้น',
                                price: '10',
                            },
                        ],
                    },
                ],
            },
            {
                c_id: 1,
                product_id: 2,
                product_img: '../../../assets/ordering/kaijeaw.jpg',
                name: 'ข้าวไข่เจียว',
                product_price: 50,
                order: 0,
                attributes: [
                    {
                        name: 'เนื้อสัตว์',
                        type: 'single',
                        productAttributeValues: [
                            { name: 'อกไก่', price: 0 },
                            { name: 'หมู', price: 0 },
                            { name: 'กุ้ง', price: 10 },
                            { name: 'ปู', price: 10 },
                        ],
                    },
                ],
            },
            {
                c_id: 1,
                product_id: 3,
                product_img: '../../../assets/ordering/kawmankai.jpg',
                name: 'ข้าวมันไก่',
                product_price: 50,
                order: 0,
                attributes: [
                    {
                        name: 'เนื้อสัตว์',
                        type: 'single',
                        productAttributeValues: [
                            { name: 'ไก่ต้ม', price: 0 },
                            { name: 'ไก่ทอด', price: 5 },
                            { name: 'รวม', price: 10 },
                        ],
                    },
                ],
            },
            {
                c_id: 1,
                product_id: 4,
                product_img: '../../../assets/ordering/thaitea.png',
                name: 'ชาไทย',
                product_price: 40,
                order: 0,
                attributes: [
                    {
                        name: 'ระดับความหวาน',
                        type: 'single',
                        productAttributeValues: [
                            { name: '0%', price: 0 },
                            { name: '25%', price: 0 },
                            { name: '50%', price: 0 },
                            { name: '75%', price: 0 },
                            { name: '100%', price: 0 },
                        ],
                    },
                ],
            },
            {
                c_id: 1,
                product_id: 5,
                product_img: '../../../assets/ordering/water.jpg',
                name: 'น้ำเปล่า',
                product_price: 10,
                order: 0,
                attributes: null,
            },
            {
                c_id: 1,
                product_id: 6,
                product_img: '../../../assets/ordering/macha.png',
                name: 'มัทฉะลาเต้',
                product_price: 60,
                order: 0,
                attributes: [
                    {
                        name: 'ระดับความหวาน',
                        type: 'single',
                        productAttributeValues: [
                            { name: '0%', price: 0 },
                            { name: '25%', price: 0 },
                            { name: '50%', price: 0 },
                            { name: '75%', price: 0 },
                            { name: '100%', price: 0 },
                        ],
                    },
                ],
            },
        ];
        let all = [];
        if (id === '') all = data;
        else all = data.filter((item) => item.c_id == id);

        //dontUse
        // for (let i = 0; i < 5; i++) {
        //   const item = data[i];
        //   let temp_data = {
        //     product_id : i,
        //     product_img : "../../../assets/ordering/americano.png",
        //     product_name : item.name,
        //     product_price : item.price,
        //     order : 0,
        //     attributes : item.productAttributes ?? null
        //   }
        //   all.push(temp_data)
        // }
        for (let i = 0; i < this.order_selected.length; i++) {
            const element = this.order_selected[i];
            if (
                all.find((item) => item.product_id == element.product_id) !=
                undefined
            )
                all.find(
                    (item) => item.product_id == element.product_id
                ).order = element.order;
        }
        //all.find
        this.all_items = all;
        this.filter_items = all;
        // this._service.get_product(id).subscribe({
        //   next:(resp: any)=> {
        //     let all = []
        //     for (let i = 0; i < resp.length; i++) {
        //       const item = resp[i];
        //       let temp_data = {
        //         product_id : item.id,
        //         product_img : "../../../assets/ordering/americano.png",
        //         product_name : item.name,
        //         product_price : item.price,
        //         order : 0,
        //         attributes : item.productAttributes ?? null
        //       }
        //       all.push(temp_data)
        //     }
        //     for (let i = 0; i < this.order_selected.length; i++) {
        //       const element = this.order_selected[i];
        //       if (all.find(item=> item.product_id == element.product_id) != undefined)
        //         all.find(item=> item.product_id == element.product_id).order = element.order
        //     }
        //     //all.find
        //     this.all_items = all
        //     this.filter_items = all
        //   }
        // })
    }

    resetText_search() {
        this.text_search = '';
        this.resetDataIn_filter();
    }

    set_filterSearch(data: any) {
        this.filterSearch = data;
        this.resetDataIn_filter();
        this.resetText_search();
    }

    categorieChange(data: any) {
        this.getProduct(data);
    }

    summaryOrder() {
        let temp_order = 0;
        let temp_price = 0;
        console.log('Bthis.order_selected');

        console.log('Athis.order_selected', this.order_selected);

        for (let item of this.order_selected) {
            temp_order += item.order;
            temp_price +=
                (parseInt(item.product_price) +
                    (item.attributes?.reduce(
                        (sum, item) => sum + item.total,
                        0
                    ) ?? 0)) *
                item.order;
        }

        this.all_order = temp_order;
        this.all_price = temp_price;
    }

    resetDataIn_filter() {
        this.filter_items = this.all_items;
    }

    openAddProduct(item: any) {
        console.log('ZZZ', this.order_selected);
        console.log('ZZZ2', item);

        if (
            item.attributes == null ||
            item.attributes.length == 0 ||
            item.attributes == ''
        ) {
            if (
                this.order_selected.find(
                    (order) => order.product_id == item.product_id
                ) === undefined
            ) {
                let temp = {
                    product_id: item.product_id,
                    name: item.name,
                    product_price: item.product_price,
                    order: 1,
                    attributes: item.attributes,
                };
                this.order_selected.push(temp);
                this.filter_items.find(
                    (order) => order.product_id == item.product_id
                ).order = 1;
            } else {
                this.order_selected.find(
                    (order) => order.product_id == item.product_id
                ).order += 1;
                this.filter_items.find(
                    (order) => order.product_id == item.product_id
                ).order += 1;
            }
            this.summaryOrder();
        } else {
            this.breakpointObserver
                .observe(['(orientation: portrait)'])
                .subscribe((result) => {
                    if (result.matches) {
                        // ถ้าแนวตั้ง แสดง Bottom Sheet
                        if (this.dialogRef)
                            this.dialogRef.close()
                        this.bottomSheetRef = this.bottom.open(
                            AddProductComponent,
                            {
                                data: {
                                    name: item.name,
                                    data: item.attributes,
                                },
                            }
                        );
                        this.bottomSheetRef
                            .afterDismissed()
                            .subscribe((result) => {
                                if (result && result !== 'cancle') {
                                    this.priceAddOn =
                                        this.priceAddOn +
                                        result.reduce(
                                            (sum, item) => sum + item.total,
                                            0
                                        );
                                    if (
                                        this.order_selected.find(
                                            (order) =>
                                                order.product_id ==
                                                item.product_id
                                        ) === undefined
                                    ) {
                                        let temp = {
                                            product_id: item.product_id,
                                            name: item.name,
                                            product_price: item.product_price,
                                            order: 1,
                                            attributes: result,
                                        };
                                        this.order_selected.push(temp);
                                        this.filter_items.find(
                                            (order) =>
                                                order.product_id ==
                                                item.product_id
                                        ).order = 1;
                                    } else {
                                        let temp = {
                                            product_id: item.product_id,
                                            product_price: item.product_price,
                                            order: 1,
                                            attributes: result,
                                        };

                                        const existingOrder =
                                            this.order_selected.find(
                                                (order) =>
                                                    order.product_id ===
                                                        temp.product_id &&
                                                    order.attributes.length ===
                                                        temp.attributes
                                                            .length && // ตรวจสอบความยาวของ attributes
                                                    temp.attributes.every(
                                                        (tempAttr) =>
                                                            order.attributes.some(
                                                                (attr) =>
                                                                    attr.attributeName ===
                                                                        tempAttr.attributeName &&
                                                                    attr
                                                                        .attributeValues
                                                                        .length ===
                                                                        tempAttr
                                                                            .attributeValues
                                                                            .length &&
                                                                    tempAttr.attributeValues.every(
                                                                        (
                                                                            tempValue
                                                                        ) =>
                                                                            attr.attributeValues.some(
                                                                                (
                                                                                    value
                                                                                ) =>
                                                                                    value.attributeValueName ===
                                                                                        tempValue.attributeValueName &&
                                                                                    //value.quantity === tempValue.quantity &&
                                                                                    //value.price === tempValue.price &&
                                                                                    value.total ===
                                                                                        tempValue.total
                                                                            )
                                                                    )
                                                            )
                                                    )
                                            );
                                        //const existingOrder = this.order_selected.find(order =>
                                        //  order.product_id === temp.product_id &&
                                        //  order.attributes.length === temp.attributes.length && // ตรวจสอบความยาวของ attributes
                                        //  order.attributes.every((attr, index) =>
                                        //    attr.attributeName === temp.attributes[index].attributeName &&
                                        //    attr.attributeValues.length === temp.attributes[index].attributeValues.length &&
                                        //    attr.attributeValues.every((value, i) =>
                                        //      value.attributeValueName === temp.attributes[index].attributeValues[i].attributeValueName &&
                                        //      //value.quantity === temp.attributes[index].attributeValues[i].quantity &&
                                        //      //value.price === temp.attributes[index].attributeValues[i].price &&
                                        //      value.total === temp.attributes[index].attributeValues[i].total
                                        //    )
                                        //  )
                                        //);

                                        if (existingOrder) {
                                            // ถ้าพบอ็อบเจกต์ที่ตรงกัน ให้เพิ่มค่า order ขึ้น 1
                                            existingOrder.order += 1;
                                            this.filter_items.find(
                                                (order) =>
                                                    order.product_id ==
                                                    item.product_id
                                            ).order += 1;
                                        } else {
                                            // ถ้าไม่พบ ให้เพิ่ม temp เข้าไปใน order_selected
                                            this.order_selected.push(temp);
                                            this.filter_items.find(
                                                (order) =>
                                                    order.product_id ==
                                                    item.product_id
                                            ).order += 1;
                                        }
                                        //const temp_data = this.order_selected.find(order => order.product_id == item.product_id)
                                        //this.order_selected.find(order => order.product_id == item.product_id).order += 1
                                        //this.filter_items.find(order => order.product_id == item.product_id).order += 1
                                    }

                                    this.summaryOrder();
                                }
                            });
                    } else {
                        if (this.bottomSheetRef)
                            this.bottomSheetRef.dismiss()
                        // ถ้าแนวนอน แสดง dialog
                        this.dialogRef = this.dialog.open(
                            AddProductComponent,
                            {
                                data: {
                                    name: item.name,
                                    data: item.attributes,
                                },
                                width: '400px',
                            }
                        );
                        this.dialogRef
                            .afterClosed()
                            .subscribe((result) => {
                                if (result && result !== 'cancle') {
                                    this.priceAddOn =
                                        this.priceAddOn +
                                        result.reduce(
                                            (sum, item) => sum + item.total,
                                            0
                                        );
                                    if (
                                        this.order_selected.find(
                                            (order) =>
                                                order.product_id ==
                                                item.product_id
                                        ) === undefined
                                    ) {
                                        let temp = {
                                            product_id: item.product_id,
                                            name: item.name,
                                            product_price: item.product_price,
                                            order: 1,
                                            attributes: result,
                                        };
                                        this.order_selected.push(temp);
                                        this.filter_items.find(
                                            (order) =>
                                                order.product_id ==
                                                item.product_id
                                        ).order = 1;
                                    } else {
                                        let temp = {
                                            product_id: item.product_id,
                                            product_price: item.product_price,
                                            order: 1,
                                            attributes: result,
                                        };

                                        const existingOrder =
                                            this.order_selected.find(
                                                (order) =>
                                                    order.product_id ===
                                                        temp.product_id &&
                                                    order.attributes.length ===
                                                        temp.attributes
                                                            .length && // ตรวจสอบความยาวของ attributes
                                                    temp.attributes.every(
                                                        (tempAttr) =>
                                                            order.attributes.some(
                                                                (attr) =>
                                                                    attr.attributeName ===
                                                                        tempAttr.attributeName &&
                                                                    attr
                                                                        .attributeValues
                                                                        .length ===
                                                                        tempAttr
                                                                            .attributeValues
                                                                            .length &&
                                                                    tempAttr.attributeValues.every(
                                                                        (
                                                                            tempValue
                                                                        ) =>
                                                                            attr.attributeValues.some(
                                                                                (
                                                                                    value
                                                                                ) =>
                                                                                    value.attributeValueName ===
                                                                                        tempValue.attributeValueName &&
                                                                                    //value.quantity === tempValue.quantity &&
                                                                                    //value.price === tempValue.price &&
                                                                                    value.total ===
                                                                                        tempValue.total
                                                                            )
                                                                    )
                                                            )
                                                    )
                                            );
                                        //const existingOrder = this.order_selected.find(order =>
                                        //  order.product_id === temp.product_id &&
                                        //  order.attributes.length === temp.attributes.length && // ตรวจสอบความยาวของ attributes
                                        //  order.attributes.every((attr, index) =>
                                        //    attr.attributeName === temp.attributes[index].attributeName &&
                                        //    attr.attributeValues.length === temp.attributes[index].attributeValues.length &&
                                        //    attr.attributeValues.every((value, i) =>
                                        //      value.attributeValueName === temp.attributes[index].attributeValues[i].attributeValueName &&
                                        //      //value.quantity === temp.attributes[index].attributeValues[i].quantity &&
                                        //      //value.price === temp.attributes[index].attributeValues[i].price &&
                                        //      value.total === temp.attributes[index].attributeValues[i].total
                                        //    )
                                        //  )
                                        //);

                                        if (existingOrder) {
                                            // ถ้าพบอ็อบเจกต์ที่ตรงกัน ให้เพิ่มค่า order ขึ้น 1
                                            existingOrder.order += 1;
                                            this.filter_items.find(
                                                (order) =>
                                                    order.product_id ==
                                                    item.product_id
                                            ).order += 1;
                                        } else {
                                            // ถ้าไม่พบ ให้เพิ่ม temp เข้าไปใน order_selected
                                            this.order_selected.push(temp);
                                            this.filter_items.find(
                                                (order) =>
                                                    order.product_id ==
                                                    item.product_id
                                            ).order += 1;
                                        }
                                        //const temp_data = this.order_selected.find(order => order.product_id == item.product_id)
                                        //this.order_selected.find(order => order.product_id == item.product_id).order += 1
                                        //this.filter_items.find(order => order.product_id == item.product_id).order += 1
                                    }

                                    this.summaryOrder();
                                }
                            });
                    }
                });
        }
        //useReal
        // this._service.getProductById(item.product_id).subscribe({
        //   next:(resp: any)=> {
        //     if (resp.productAttributes == null || resp.productAttributes.length == 0 || resp.productAttributes == ''){
        //       //item.order = item.order + 1

        //       if (this.order_selected.find(order => order.product_id == item.product_id) === undefined){
        //         let temp = {
        //           product_id: item.product_id,
        //           product_price: item.product_price,
        //           order: 1,
        //           attributes: item.attributes
        //         }
        //         this.order_selected.push(temp)
        //         this.filter_items.find(order => order.product_id == item.product_id).order = 1
        //       } else {
        //         //if (this.order_selected === this.filter_items || this.order_selected === this.all_items ){
        //         //  this.order_selected.find(order => order.product_id == item.product_id).order += 1
        //         //}else{
        //           this.order_selected.find(order => order.product_id == item.product_id).order += 1
        //           this.filter_items.find(order => order.product_id == item.product_id).order += 1
        //         //}
        //       }
        //       this.summaryOrder()
        //     } else {
        //       const bottomSheetAddProductRef = this.bottom.open(AddProductComponent, {
        //         data: {
        //           name: resp.name,
        //           data: resp.productAttributes
        //         }
        //       });
        //       bottomSheetAddProductRef.afterDismissed().subscribe((result) => {

        //         if (result && result !== 'cancle') {
        //           //item.order = item.order + 1
        //           this.priceAddOn = this.priceAddOn + result?.reduce((sum, item) => sum + item.total, 0) ?? 0
        //           if (this.order_selected.find(order => order.product_id == item.product_id) === undefined){
        //             let temp = {
        //               product_id: item.product_id,
        //               product_price: item.product_price,
        //               order: 1,
        //               attributes: result
        //             }
        //             this.order_selected.push(temp)
        //             this.filter_items.find(order => order.product_id == item.product_id).order = 1
        //           } else {
        //             let temp = {
        //               product_id: item.product_id,
        //               product_price: item.product_price,
        //               order: 1,
        //               attributes: result
        //             }

        //             const existingOrder = this.order_selected.find(order =>
        //               order.product_id === temp.product_id &&
        //               order.attributes.length === temp.attributes.length && // ตรวจสอบความยาวของ attributes
        //               temp.attributes.every(tempAttr =>
        //                 order.attributes.some(attr =>
        //                   attr.attributeName === tempAttr.attributeName &&
        //                   attr.attributeValues.length === tempAttr.attributeValues.length &&
        //                   tempAttr.attributeValues.every(tempValue =>
        //                     attr.attributeValues.some(value =>
        //                       value.attributeValueName === tempValue.attributeValueName &&
        //                       //value.quantity === tempValue.quantity &&
        //                       //value.price === tempValue.price &&
        //                       value.total === tempValue.total
        //                     )
        //                   )
        //                 )
        //               )
        //             );
        //             //const existingOrder = this.order_selected.find(order =>
        //             //  order.product_id === temp.product_id &&
        //             //  order.attributes.length === temp.attributes.length && // ตรวจสอบความยาวของ attributes
        //             //  order.attributes.every((attr, index) =>
        //             //    attr.attributeName === temp.attributes[index].attributeName &&
        //             //    attr.attributeValues.length === temp.attributes[index].attributeValues.length &&
        //             //    attr.attributeValues.every((value, i) =>
        //             //      value.attributeValueName === temp.attributes[index].attributeValues[i].attributeValueName &&
        //             //      //value.quantity === temp.attributes[index].attributeValues[i].quantity &&
        //             //      //value.price === temp.attributes[index].attributeValues[i].price &&
        //             //      value.total === temp.attributes[index].attributeValues[i].total
        //             //    )
        //             //  )
        //             //);

        //             if (existingOrder) {
        //               // ถ้าพบอ็อบเจกต์ที่ตรงกัน ให้เพิ่มค่า order ขึ้น 1
        //               existingOrder.order += 1;
        //               this.filter_items.find(order => order.product_id == item.product_id).order += 1
        //             } else {
        //               // ถ้าไม่พบ ให้เพิ่ม temp เข้าไปใน order_selected
        //               this.order_selected.push(temp);
        //               this.filter_items.find(order => order.product_id == item.product_id).order += 1
        //             }
        //             //const temp_data = this.order_selected.find(order => order.product_id == item.product_id)
        //             //this.order_selected.find(order => order.product_id == item.product_id).order += 1
        //             //this.filter_items.find(order => order.product_id == item.product_id).order += 1
        //           }
        //           this.summaryOrder()
        //         }
        //       });
        //     }
        //   }
        // })
    }

    openPromotion() {
        const bottomSheePromotiontRef = this.bottom.open(PromotionBsComponent, {
            data: '',
        });
    }

    next() {
        let sum_order = [];
        for (let item of this.all_items) {
            if (item.order > 0) sum_order.push(item);
        }
        let all_data = {
            data: sum_order,
            num_order: this.all_order,
            sum_price: this.all_price,
            select: this.order_selected,
        };
        this._service.sendOrder(all_data);
        //useReal
        this.add_order();
        //dontUse
        // sessionStorage.setItem('orderId', '001')
        // this._router.navigate(['/summary-order'])
    }

    add_order() {
        let roomNo = sessionStorage.getItem('roomNo');
        let temp_order = [];
        for (let i = 0; i < this.order_selected.length; i++) {
            const element = this.order_selected[i];
            console.log(
                'this.order_selected.length',
                this.order_selected.length
            );
            console.log('Aelement', element);
            if (element.order > 0) {
                console.log('Okk');
                let temp_data = {
                    productId: element.product_id,
                    name: element.name, // notHave
                    price: element.product_price,
                    quantity: element.order,
                    total:
                        (element.product_price +
                            (element.attributes ?? []).reduce(
                                (sum, item) => sum + item.total,
                                0
                            )) *
                        element.order,
                    attributes: element?.attributes,
                };
                console.log('Celement', temp_data);
                console.log('Belement', temp_data.total);

                temp_order.push(temp_data);
            } else {
                console.log('Nooo');
            }
        }
        const temp_grand = temp_order?.reduce(
            (sum, item) => sum + item.total,
            0
        );
        let formvalue = {
            total: this.all_price,
            deviceId: 1,
            branchId: 1,
            roomNo: roomNo,
            orderItems: temp_order,
            remark: '',
            grandtotal: ((temp_grand * 110) / 100).toFixed(2),
            serviceCharge: (temp_grand / 10).toFixed(2),
            serviceChargeRate: 10,
            vat: 0,
        };
        //useReal
        // this._service.add_order(c).subscribe({
        //   next: (resp: any)=> {
        //     sessionStorage.setItem('orderId', resp.id)
        //     this._router.navigate(['/summary-order'])
        //   },
        //   error: ()=> this.toastr.error("error")
        // })
        this._service.sendOrder(formvalue);
        sessionStorage.setItem('orderId', '001');
        this._router.navigate(['/summary-order']);
    }

    search_itemName(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const find_data = inputElement.value;
        if (find_data != '') {
            this.filter_items = this.all_items.filter(
                (item) =>
                    item.name &&
                    item.name.toLowerCase().includes(find_data.toLowerCase())
            );
        } else {
            this.filter_items = this.all_items;
        }
    }
}
