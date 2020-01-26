import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingService } from './shopping.service';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from './shopping-routing.module';



@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingRoutingModule,
  ],
})
export class ShoppingListModule { }
