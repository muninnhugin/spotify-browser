import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    return firstValueFrom(this.http.get(this.expressBaseUrl + endpoint)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    return this.sendRequestToExpress(
        '/search/' + encodeURIComponent(category) + '/' + encodeURIComponent(resource))
        .then((data) => { return data;  })
  }

  getArtist(artistId:string):Promise<ArtistData> {
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId)).then((data) => {
        return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    return this.sendRequestToExpress('/artist-related-artists/' + encodeURIComponent(artistId)).then((data) => {
      let result = [];
      for (let i=0; i < data['artists'].length; i++) {
        result.push(new ArtistData(data['artists'][i]));
      }
      return result;
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    return this.sendRequestToExpress('/artist-top-tracks/' + encodeURIComponent(artistId)).then((data) => {
      let result = [];
      for (let i=0; i < data['tracks'].length; i++) {
        result.push(new TrackData(data['tracks'][i]));
      }
      return result;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    return this.sendRequestToExpress('/artist-albums/' + encodeURIComponent(artistId)).then((data) => {
      let result = [];
      for (let i=0; i < data['items'].length; i++) {
        result.push(new AlbumData(data['items'][i]));
      }
      return result;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    return this.sendRequestToExpress('/album/' + encodeURIComponent(albumId)).then((data) => {
      return data;
    })
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    return this.sendRequestToExpress('/album-tracks/' + encodeURIComponent(albumId)).then((data) => {
      let tracks = [];
      for (let i= 0; i < data['items'].length; i++) {
        tracks.push(new TrackData(data['items'][i]));
      }
      return tracks;
    })
  }

  getTrack(trackId:string):Promise<TrackData> {
    return this.sendRequestToExpress('/track/' + encodeURIComponent(trackId)).then((data) => {
      return new TrackData(data);
    })
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    return this.sendRequestToExpress('/track-audio-features/' + encodeURIComponent(trackId)).then((data) => {
      let result = [];
      result.push(new TrackFeature('danceability', data['danceability']));
      result.push(new TrackFeature('energy', data['energy']));
      result.push(new TrackFeature('speechiness', data['speechiness']));
      result.push(new TrackFeature('acousticness', data['acousticness']));
      result.push(new TrackFeature('instrumentalness', data['instrumentalness']));
      result.push(new TrackFeature('liveness', data['liveness']));
      result.push(new TrackFeature('valence', data['valence']));
      return result;
    })
  }
}
