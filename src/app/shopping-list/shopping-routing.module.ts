import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {path: 'shoppingList' , component: ShoppingListComponent},
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ShoppingRoutingModule {}
