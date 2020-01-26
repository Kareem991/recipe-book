import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { FormControl, FormGroup, Form, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  index: number;
  editMode = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.editMode = params.id != null ;
      this.index = +params.id;
      this.privateForm();
    });
  }
  onSubmit() {
    const newRecipe = new Recipe(this.form.value.name,
       this.form.value.description, this.form.value.imagePath, this.form.value.ingredients);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.index, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }
  private privateForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.findRecipeById(this.index);
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup(
            {
            name: new FormControl(ingredient.name, Validators.required) ,
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }
          ));
      }
    }
  }
    this.form = new FormGroup({
    name: new FormControl(recipeName, Validators.required),
    description: new FormControl(recipeDescription, Validators.required),
    imagePath: new FormControl(recipeImage, Validators.required),
    ingredients: recipeIngredients
    });

  }
  addIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup ({
        name : new FormControl(null, Validators.required),
        amount : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
  onCancel() {
this.router.navigate(['../'], {relativeTo: this.route});
  }
  deleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }
  getControls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }
}
