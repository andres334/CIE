import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models';

@Pipe({
  name: 'noImage'
})
export class NoimagePipe implements PipeTransform {

  transform( images : Usuario): string {
    if(!images){
      return 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg';
    }else{
      if(images.avatarUrl !=''){
        return images.avatarUrl;
      }else{
        return 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg';}
      }
    }
}
