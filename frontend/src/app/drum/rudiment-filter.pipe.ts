import { Pipe, PipeTransform } from '@angular/core';
import { Rudiment } from './rudiment/rudiment.model';

@Pipe({
  name: 'rudimentFilter'
})
export class RudimentFilterPipe implements PipeTransform {

  transform(rudiments: Rudiment[], filterName: string): Rudiment[] {
    if (!filterName || filterName.length === 0)
      return rudiments;
    return rudiments.filter(r => r.name.search(filterName) >= 0);
  }

}
