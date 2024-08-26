import { Component, Inject } from '@angular/core';
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
  num_shot: any = 0

  attribute: any = []

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddProductComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private router: Router,
    private toastrService: ToastrService
    ) {
      console.log(this.data);
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
    setAttribute(name: any, data: any, typeAtt: any, allAttDetail: any){
      console.log(allAttDetail);
      
      if(typeAtt == 'multiple'){
        console.log('multiple');
        
        //if(name in this.attribute){
        //  if(this.attribute[name]?.find(item => item == data)){
        //    this.attribute[name] = this.attribute[name].filter(item => item !== data);
        //  } else {
        //    this.attribute[name].push(data)
        //  }
        //} else {
        //  this.attribute[name] = []
        //  this.attribute[name].push(data)
        //}
      } else {
        //this.attribute[name] = data
        if (this.attribute.find(item => item.attributeName == name)){
          if((this.attribute.find(item => item.attributeName == name)).attributeValues.find(item=> item.attributeValueName == data)){
            this.attribute = this.attribute.filter(item => item.attributeName != name)
          }else {
            this.attribute = this.attribute.filter(item => item.attributeName != name)
            const temp = {
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
        console.log('this.attribute111', this.attribute);
      }
    }

    MaxWidthTextColspan(itemName: any, itemAtt: any) {
      const maxWidth = Math.max(...itemAtt.map(item => item.name.length))
      //console.log(itemName,' => maxWidth:', maxWidth);
      if(maxWidth <= 4)
        return 'grid-cols-5'
      else if(maxWidth <= 5)
        return 'grid-cols-4'
      else if(maxWidth <= 6)
        return 'grid-cols-3'
      else
        return 'grid-cols-2'
    }

    findDataArray(name: any, value: any){
      //console.log(name,'  ',value,'  ',this.attribute[name]?.find(item => item == value));
      if(this.attribute.find(item => item.attributeName == name && item.find(attvalue=> attvalue.attributeValues == value)) != undefined){
        console.log('find: ',this.attribute.find(item => item.attributeName == name && item.find(attvalue=> attvalue.attributeValues == value)));
        return true
      } else {
        return false
      }
      return false
    }

    changeShot(data: any){
      if (data == 'minus'){
        this.num_shot -= 1
      }else if (data == 'plus'){
        this.num_shot += 1
      }
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
      this._bottomSheetRef.dismiss();
    }

    close(){
      this._bottomSheetRef.dismiss('');
    }

    cancle(){
      this._bottomSheetRef.dismiss('cancle');
    }
  
    confirmed() {
      console.log("888", this.attribute);
      
      //this.toastrService.success('เพิ่มสินค้าสำเร็จ', '', {positionClass: 'toast-top-center'})
      //this._bottomSheetRef.dismiss(this.attribute);
    }
}
