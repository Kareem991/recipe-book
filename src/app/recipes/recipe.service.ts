import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Pepperoni Pizza', 'Pizza Pizza all the way!',
    // tslint:disable-next-line: max-line-length
    'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/8/6/0/WU2301_Four-Cheese-Pepperoni-Pizzadilla_s4x3.jpg.rend.hgtvcom.826.620.suffix/1565115622965.jpeg',
    [new Ingredient('Mushroom' , 12), new Ingredient('Tomatoes' , 10), new Ingredient('Flour', 20)]
    )
    , new Recipe( 'Sweet Crepes', 'Super scrumptious crepe that will make your mouth melt!',
    // tslint:disable-next-line: max-line-length
    'https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_567,h_319/v1/img/recipes/18/41/0/mlUJhy1T3CFzP1eDMACA_DSC_0003.jpg',
    [new Ingredient('Flour', 2), new Ingredient('Milk' , 1) , new Ingredient('Egg', 10)]
    )
  ];
  getRecipes() {
    return this.recipes.slice();
  }
  findRecipeById(id: number) {
  return this.recipes[id];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
  replaceRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
