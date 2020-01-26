import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
ingredients: Ingredient [];
private subscription: Subscription;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getItems();
    this.subscription = this.shoppingService.addedIngredient.subscribe(
      (items: Ingredient[]) => {
        this.ingredients = items;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onEditItem(id: number) {
    this.shoppingService.startedEditing.next(id);
      }
}
