import { Ingredient } from '../shared/ingredient.model';
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingService {
 private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
startedEditing = new Subject <number>();
addedIngredient = new Subject <Ingredient[]>();
addItem(item: Ingredient) {
this.ingredients.push(item);
this.addedIngredient.next(this.ingredients.slice());
}
getItems() {
  return this.ingredients.slice();
}
getIngredient(index: number) {
return this.ingredients[index];
}
updateIngredient(id: number, ingredient: Ingredient) {
this.ingredients[id] = ingredient;
this.addedIngredient.next(this.ingredients.slice());
}
deleteIngredient(id: number) {
  this.ingredients.splice(id, 1);
  this.addedIngredient.next(this.ingredients.slice());
}
}

