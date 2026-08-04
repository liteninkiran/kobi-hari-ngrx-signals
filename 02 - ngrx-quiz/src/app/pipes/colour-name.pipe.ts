import { Pipe, PipeTransform } from '@angular/core';
import { displayNameOfColour } from '../services/helpers';

@Pipe({
  name: 'colourName',
  standalone: true,
})
export class ColourNamePipe implements PipeTransform {
  transform(value: string): string {
    return displayNameOfColour(value);
  }
}
