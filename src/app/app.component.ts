import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
ngOnInit() {
firebase.initializeApp({
  apiKey: 'AIzaSyAekmlVAT6WRZJ7PhljzNddlHbC10H_cls',
  authDomain: 'ng-recipe-book-46825.firebaseapp.com',
});
}
}
