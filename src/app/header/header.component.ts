import { Component } from '@angular/core';
import { FirebaseServiceService } from '../shared/firebase-service.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private firebaseService: FirebaseServiceService, private recipeService: RecipeService,
              public authService: AuthService, private router: Router, private state: ActivatedRoute) {
}
onSaveData() {
this.firebaseService.sendData(this.recipeService.getRecipes()).subscribe(response =>
  console.log(response));
}
onFetchData() {
  this.firebaseService.getData().subscribe(data => {
    const recipes = [];
    for (const recipe of (data as Array<any>)) {
      recipes.push(recipe);
    }
    this.recipeService.replaceRecipes(recipes);
  });
}
onLogout() {
this.authService.logout().then(data => {
this.router.navigate(['/signin'], {relativeTo: this.state});
});
}
}
