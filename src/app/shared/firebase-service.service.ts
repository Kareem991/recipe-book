import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private http: HttpClient, private authService: AuthService) { }

sendData(recipes: Recipe[]) {
const token = this.authService.getToken();
return this.http.put('https://ng-recipe-book-46825.firebaseio.com/recipe.json?auth=' + token, recipes);
}
getData() {
const token = this.authService.getToken();
return this.http.get('https://ng-recipe-book-46825.firebaseio.com/recipe.json?auth=' + token);
}
}
