import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Person } from './models/person.model';
import { patchState, signalState } from '@ngrx/signals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly person = signalState<Person>({
    id: 1,
    name: 'John Doe',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
    }
  });

  // readonly personStreet = computed(() => 
  //   this.person().address.street
  // )

  readonly personStreet = this.person.address.street;

  method() {
    patchState(this.person, p => ({
      address: {
        ...p.address, 
        street: '456 Elm St'
      }
    }));
  }
}
