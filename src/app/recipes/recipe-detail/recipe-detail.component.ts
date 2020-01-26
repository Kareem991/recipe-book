import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe: Recipe;
id: number;
  constructor(private recipeservice: RecipeService,
              private shoppingService: ShoppingService,
              private router: Router,
              private state: ActivatedRoute) { }

  ngOnInit() {
    this.state.params.subscribe( params => {
          this.id = +params.id;
          this.recipe = this.recipeservice.findRecipeById(this.id);
      });
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(element => {
      if (this.shoppingService.getItems().find( item => {
        return item.name === element.name;
      })) {
        return;
      }
      this.shoppingService.addItem(element);
    });
    this.router.navigate(['shoppingList']);
  }
  onDelete() {
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['../recipes']);
  }
}

