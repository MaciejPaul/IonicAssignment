import { Routes }     from '@angular/router';
import { HomePage }   from './home/home.page';
import { GalleryPage } from './gallery/gallery.page';
import { BookmarksPage } from './bookmarks/bookmarks.page';

export const routes: Routes = [
  { path: '',        component: HomePage},
  { path: 'gallery', component: GalleryPage },
  { path: 'bookmarks',component: BookmarksPage },
];
