import { Pipe, PipeTransform } from '@angular/core';
import {Room} from "./rooms.interface";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: Room[] | null, price: number | null): Room[] {
    if (!value) {
      return [];
    }
    if (!price) {
      return value;
    }
    return value.filter(room => room.price <= price);
  }
}
