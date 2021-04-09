import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` }});
      }));
  }

  getArtistById(id): Observable<SpotifyApi.SingleArtistResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
          return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}`}});
      }));
  }

  getAlbumsByArtistId(id): Observable<SpotifyApi.ArtistsAlbumsResponse>{
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
          return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums`, { headers: { "Authorization": `Bearer ${token}`}, params: {"include_groups": "album,single", "limit": "50"}});
      }));
  }

  getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse>{
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}`}});
      }));
  }

  searchArtists(searchString): Observable<SpotifyApi.ArtistSearchResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ArtistSearchResponse>(`https://api.spotify.com/v1/search`, { headers: { "Authorization": `Bearer ${token}`}, params: {"q": `${searchString}`, "type": "artist", "limit": "50"}});
    }));
  }

  addToFavourites(id): Observable<[String]> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    return this.http.put<any>(`${environment.userAPIBase}/api/user/favourites/${id}`, { headers: { "Authorization": `JWT ${localStorage.getItem("access_token")}`}})
  }
  
  removeFromFavourites(id): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/api/user/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      favouritesArray.splice(favouritesArray.indexOf(id), 1);
        return this.getFavourites();
    }));
  }
  
  getFavourites(): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http.get<[String]>(`${environment.userAPIBase}/api/user/favourites/`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      if (favouritesArray.length > 0){
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
            return this.http.get<any>(`https://api.spotify.com/v1/tracks`, { headers: { "Authorization": `Bearer ${token}`}, params: {"ids": `${favouritesArray.join()}`}});
        }));
      }
      else{
          return new Observable(o=>o.next({tracks: []}));
      }
    }));
  }
}