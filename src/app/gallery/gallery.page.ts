import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton, IonSpinner, IonButtons } from '@ionic/angular/standalone';
import { ArticService } from '../services/artic.service';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [IonButtons, IonSpinner, NgIf, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton],
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss']
})
export class GalleryPage implements OnInit {
  // Properties
  imageUrls: string[] = [];
  currentIndex: number = -1;
  imageUrl: string = '';
  bookmarks: string[] = [];
  

  constructor(
    private artic: ArticService,
    private router: Router
  ) {}

  // Navigation methods
  goHome() {
    this.router.navigate(['/']);
  }

  goBookmarks() {
    this.router.navigate(['/bookmarks']);
  }

  //functional methods
  ngOnInit() {
    this.loadBookmarks();
    this.loadNext();
  }

  loadNext() {
    this.artic.getRandomArtwork().subscribe(url => {
      this.imageUrls.push(url);
      this.currentIndex++;
      this.imageUrl = url;
    });
  }

  loadPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.imageUrl = this.imageUrls[this.currentIndex];
    }
  }

   async toggleBookmark() {
    if (this.isBookmarked()) {
      this.bookmarks = this.bookmarks.filter(url => url !== this.imageUrl);
      await Toast.show({ text: 'Removed bookmark', duration: 'short' });
    } else {
      this.bookmarks.push(this.imageUrl);
      await Toast.show({ text: 'Added to bookmarks', duration: 'short' });
    }
    this.saveBookmarks();
  }
  ionViewWillEnter() {
    this.loadBookmarks();
  }
  isBookmarked(): boolean {
    return this.bookmarks.includes(this.imageUrl);
  }

  saveBookmarks() {
    
    localStorage.setItem('bookmarkedImages', JSON.stringify(this.bookmarks));
  }

  loadBookmarks() {
    const stored = localStorage.getItem('bookmarkedImages');
    this.bookmarks = stored ? JSON.parse(stored) : [];
  }

  async showToast() {
    await Toast.show({
      text: 'This is a Toast message!',
      duration: 'short'
    });
  }
}
