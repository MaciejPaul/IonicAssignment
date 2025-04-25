import { Injectable }       from '@angular/core';
import { HttpClient }       from '@angular/common/http';
import { Observable, map }  from 'rxjs';

// API response interfaces
// API returns a JSON object
interface ArticResponse {
  data: { id: number; title: string; image_id: string };
  config: { iiif_url: string };
}

interface ArticListResponse {
    data: Array<{
      id: number;
      image_id: string;
    }>;
    config: {
      iiif_url: string;
    };
  }

@Injectable({ providedIn: 'root' })
export class ArticService {
  private API = 'https://api.artic.edu/api/v1/artworks';

  constructor(private http: HttpClient) {}

 
  getArtworkImageUrl(id: number): Observable<string> {
    return this.http
      .get<ArticResponse>(`${this.API}/${id}?fields=id,title,image_id`)
      .pipe(map(res =>
        `${res.config.iiif_url}/${res.data.image_id}/full/843,/0/default.jpg`
      ));
  }

  // random art url from api
  getRandomArtwork(): Observable<string> {
    const page = Math.floor(Math.random() * 1000) + 1;
    return this.http
      .get<ArticListResponse>(`${this.API}?page=${page}&limit=1&fields=id,image_id`)
      .pipe(
        map(res => {
          const art = res.data[0];
          return `${res.config.iiif_url}/${art.image_id}/full/843,/0/default.jpg`;
        })
      );
  }
}
