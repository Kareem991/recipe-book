import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '' , component: HomeComponent , pathMatch: 'full'},
  {path: '404' , component: PageNotFoundComponent},
  {path: 'recipes' , loadChildren: './recipes/recipe.module#RecipeModule'},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)] ,
  exports: [RouterModule]
}
)
export class AppRoutingModule {}
