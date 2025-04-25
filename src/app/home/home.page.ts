import { Component } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  constructor(private router: Router) {}

  /// Navigation methods
  goGallery() {
    this.router.navigate(['/gallery']);
  }

  goBookmarks() {
    this.router.navigate(['/bookmarks']);
  }
}
