import { Component, inject } from '@angular/core';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ShopStore } from '../../store/shop.store';

@Component({
  selector: 'app-items-list',
  imports: [ItemCardComponent],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
})
export class ItemsListComponent {
  readonly store = inject(ShopStore);
}
