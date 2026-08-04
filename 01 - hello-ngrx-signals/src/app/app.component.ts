import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Person } from './models/person.model';

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
  readonly person = signal<Person>(person);
  readonly personStreet = computed(() => this.person().address.street);
}
