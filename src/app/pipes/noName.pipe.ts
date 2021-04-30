import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models';

@Pipe({
  name: 'noName'
})
export class NonamePipe implements PipeTransform {

  transform(name: Usuario): string {
    if (!name) {
      return '';
    } else {
      return name.nombreUsuario;
    }

  }

}
