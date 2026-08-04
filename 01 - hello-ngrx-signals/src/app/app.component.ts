import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Person } from './models/person.model';
import { patchState, signalState } from '@ngrx/signals';

const person: Person = {
  id: 1,
  name: 'John Doe',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
  },
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly person = signalState<Person>(person);
  readonly personStreet = this.person.address.street;

  method() {
    patchState(this.person, (p) => ({
      address: { ...p.address, street: '456 Elm St' },
    }));
  }
}
