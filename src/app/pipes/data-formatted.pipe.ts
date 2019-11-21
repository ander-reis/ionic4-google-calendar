import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormatted'
})
export class DataFormattedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `aqui`;
  }

}
