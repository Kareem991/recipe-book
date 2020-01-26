import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
editIndex: number;
subscription: Subscription;
editMode = false;
@ViewChild('shoppingForm', {static: false}) slForm: NgForm;
onClear() {
  this.slForm.reset();
}
onDelete() {
this.shoppingservice.deleteIngredient(this.editIndex);
this.slForm.reset();
this.editMode = false;
}
onSubmit(form: NgForm) {
  const editIngredient = new Ingredient(form.value.name, form.value.amount);
  if (this.editMode) {
    this.shoppingservice.updateIngredient(this.editIndex, editIngredient);
  } else {
  this.shoppingservice.addItem(editIngredient);
  }
  this.slForm.reset();
  this.editMode = false;
}
  constructor(private shoppingservice: ShoppingService) { }

  ngOnInit() {
    this.subscription = this.shoppingservice.startedEditing.subscribe( data => {
      this.editIndex = data;
      this.editMode = true;
      const editIngredient = this.shoppingservice.getIngredient(this.editIndex);
      this.slForm.setValue({
        name: editIngredient.name,
        amount: editIngredient.amount
      });
    });
  }
ngOnDestroy() {
  this.subscription.unsubscribe();
}


}

