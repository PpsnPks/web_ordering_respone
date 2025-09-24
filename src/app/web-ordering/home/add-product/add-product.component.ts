import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bottom-product',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  size_selected: any = 'S'
  sweet_selected: any = '100%'
  ice_selected: any = '70%'
  topping_selected: any = 'Pineapple Jelly'
  promotions: any
  num_shots: any = {}

  attribute: any = []
  data: any

  constructor(
    @Optional() private dialogRef: MatDialogRef<AddProductComponent>,
    @Optional() private bottomSheetRef: MatBottomSheetRef<AddProductComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) private bottomSheetData: any,
    private router: Router,
    private toastrService: ToastrService
    ) {
      let data = dialogData ?? bottomSheetData;
      this.data = data
      console.log('dataName',data.name)
      console.log('data: ', data);
      for (let i = 0; i < data.data.length; i++) {
        const element = data.data[i];
        if(element.type === 'quantity'){
          this.num_shots[i] = 0
        }
      }
      //this.promotions = [
      //  { name: 'On Top Promotions',  reduced: 'สินค้าลดเหลือ 100', type: 'Discount', startDate: '15/03/2025', endDate: '31/06/2025'},
      //  { name: 'Promotion Set',  reduced: 'สินค้าลดเหลือ 90', type: 'Gift', startDate: '01/11/2025', endDate: '31/12/2025'},
      //  { name: 'Promotion Set',  reduced: 'แถมโค้ก 1 ขวด', type: 'Gift', startDate: '01/12/2025', endDate: '31/01/2025'},
      //]
      //this.size = [
      //  {
      //    id:
      //  }
      //]
    }
    setAttributeQuantity(name: any, data: any,  allAttDetail: any, index: any){
      //this.attribute[name] = data
      if (this.attribute.find(item => item.attributeName == name)){
          this.attribute = this.attribute.filter(item => item.attributeName != name)
          const temp = {
            type: 'quantity',
            attributeName: name,
            total: allAttDetail.price * this.num_shots[index],
            attributeValues:[{
              attributeValueName: allAttDetail.name,
              quantity: this.num_shots[index],
              price: allAttDetail.price,
              total: allAttDetail.price * this.num_shots[index]

            }]
          }
          console.log('temp: ',temp);
          
          this.attribute.push(temp)
      } else {
        const temp = {
          type: 'quantity',
          attributeName: name,
          total: allAttDetail.price * this.num_shots[index],
          attributeValues:[{
            attributeValueName: allAttDetail.name,
            quantity: this.num_shots[index],
            price: allAttDetail.price,
            total: allAttDetail.price * this.num_shots[index]
          }]
        }
          console.log('temp: ',temp);
          this.attribute.push(temp)
      }
    }

    setAttribute(name: any, data: any, typeAtt: any, allAttDetail: any){
      if(typeAtt == 'multiple'){
        const temp_data = this.attribute.find(item => item.attributeName == name)
        if (temp_data){
          if(temp_data.attributeValues.some(item=> item.attributeValueName == data)){
            temp_data.attributeValues = temp_data.attributeValues.filter(item => item.attributeValueName != data)
          }else {
            const temp = {
                attributeValueName: allAttDetail.name,
                quantity: 1,
                price: allAttDetail.price,
                total: allAttDetail.price
            }
            temp_data.attributeValues.push(temp)
          }
          temp_data.total = temp_data.attributeValues.reduce((sum, item) => sum + item.total, 0);
        } else {
          const temp = {
            type: 'multiple',
            attributeName: name,
            total: allAttDetail.price,
            attributeValues:[{
              attributeValueName: allAttDetail.name,
              quantity: 1,
              price: allAttDetail.price,
              total: allAttDetail.price
            }]
          }
          this.attribute.push(temp)
        }
      } else if (typeAtt == 'single'){
        //this.attribute[name] = data
        if (this.attribute.find(item => item.attributeName == name)){
          if((this.attribute.find(item => item.attributeName == name)).attributeValues.find(item=> item.attributeValueName == data)){
            this.attribute = this.attribute.filter(item => item.attributeName != name)
          }else {
            this.attribute = this.attribute.filter(item => item.attributeName != name)
            const temp = {
              type: 'single',
              attributeName: name,
              total: allAttDetail.price,
              attributeValues:[{
                attributeValueName: allAttDetail.name,
                quantity: 1,
                price: allAttDetail.price,
                total: allAttDetail.price
              }]
            }
            this.attribute.push(temp)
          }
        } else {
            const temp = {
            type: 'single',
            attributeName: name,
            total: allAttDetail.price,
            attributeValues:[{
              attributeValueName: allAttDetail.name,
              quantity: 1,
              price: allAttDetail.price,
              total: allAttDetail.price
            }]
          }
          this.attribute.push(temp)
        }
      }
    }

    MaxWidthTextColspan(itemName: any, itemAtt: any) {
      const maxWidth = Math.max(...itemAtt.map(item => item.name.length))
      if(maxWidth <= 4){
        if(itemAtt.length < 5)
          return 'grid-cols-' + itemAtt.length
        return 'grid-cols-5'
      }
      else if(maxWidth <= 5){
        if(itemAtt.length < 4)
          return 'grid-cols-' + itemAtt.length
        return 'grid-cols-4'
      }
      else if(maxWidth <= 6){
        if(itemAtt.length < 3)
          return 'grid-cols-' + itemAtt.length
        return 'grid-cols-3'
      }
      else{
        if(itemAtt.length < 2)
          return 'grid-cols-' + itemAtt.length
        return 'grid-cols-2'
      }
    }

    findDataArray(name: any, value: any){
      const tempFind = this.attribute.find(item => item.attributeName == name)

      if(tempFind !== undefined ){
        return tempFind.attributeValues.some(item => item.attributeValueName === value)
      }
      else {
        return false
      }
    }

    changeShot(data: any, index: any, item_name: any, value_name: any, item_type: any, value: any){
      if (data === 'plus') {
        this.num_shots[index] = (this.num_shots[index] || 0) + 1;
        this.setAttributeQuantity(item_name, value_name, value, index)
      } else if (data === 'minus' && this.num_shots[index] > 0) {
        this.num_shots[index] -= 1;
        this.setAttributeQuantity(item_name, value_name, value, index)
      }
      // if (data == 'minus'){
      //   this.num_shot -= 1
      //   console.log('item', item);
      //   // this.setAttribute(item_name, value_name, item_type, this.num_shot)
      // }else if (data == 'plus'){
      //   this.num_shot += 1
      //   console.log('item', item);
      //   // this.setAttribute(item_name, value_name, item_type, this.num_shot)
      // }
    }

    setSize(data: any){
      this.size_selected = data
    }

    setSweet(data: any){
      this.sweet_selected = data
    }

    setIce(data: any){
      this.ice_selected = data
    }

    setTopping(data: any){
      this.topping_selected = data
    }

    goto() {
      if (this.dialogRef) {
        this.dialogRef.close();
      } else if (this.bottomSheetRef) {
        this.bottomSheetRef.dismiss();
      }
    }

    close(){
      if (this.dialogRef) {
        this.dialogRef.close('');
      } else if (this.bottomSheetRef) {
        this.bottomSheetRef.dismiss('');
      }
    }

    cancle(){
      if (this.dialogRef) {
        this.dialogRef.close('cancle');
      } else if (this.bottomSheetRef) {
        this.bottomSheetRef.dismiss('cancle');
      }
    }

    confirmed() {
      this.toastrService.success('เพิ่มสินค้าสำเร็จ', '', {positionClass: 'toast-top-center'})
      if (this.dialogRef) {
        this.dialogRef.close(this.attribute);
      } else if (this.bottomSheetRef) {
        this.bottomSheetRef.dismiss(this.attribute);
      }
    }
}
