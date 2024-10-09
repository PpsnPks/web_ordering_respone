import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isActiveLabel',
    standalone: true
})

export class IsActiveLabelPipe implements PipeTransform {
    transform(value: any): string {

        return value === 'true' ? 'เปิดใช้งาน' : 'ปิดใช้งาน';
    }
}
