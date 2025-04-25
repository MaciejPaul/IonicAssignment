// src/app/bookmarks/bookmarks.page.ts
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { NgFor, NgIf }       from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons,
  IonButton, IonContent, IonGrid, IonRow,
  IonCol, IonImg, IonIcon
} from '@ionic/angular/standalone';
import { trash }             from 'ionicons/icons';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [
    NgFor, NgIf,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonGrid, IonRow, IonCol, IonImg, IonIcon
  ],
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss']
})
export class BookmarksPage implements OnInit {
  bookmarks: string[] = [];
  trash = trash;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadBookmarks();
  }
  
  ionViewWillEnter() {
    // This will trigger every time the page is navigated to
    this.loadBookmarks();
  }
  /** Navigation methods */
  goHome() {
    this.router.navigate(['/']);
  }

  goGallery() {
    this.router.navigate(['/gallery']);
  }

  loadBookmarks() {
    const stored = localStorage.getItem('bookmarkedImages');
    this.bookmarks = stored ? JSON.parse(stored) : [];
  }

  removeBookmark(url: string) {
    this.bookmarks = this.bookmarks.filter(u => u !== url);
    localStorage.setItem('bookmarkedImages', JSON.stringify(this.bookmarks));
    this.loadBookmarks();
  }
}
