import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string;
  searchCategories:string[] = ['artist', 'album', 'track'];
  artists:ArtistData[];
  tracks:TrackData[];
  albums:AlbumData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  // TODO: test with switching search between artist/album and track
  search() {
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then(resource => {
      switch (this.searchCategory) {
        case 'artist':  this.artists = resource['artists']['items']; console.log(this.artists); break;
        case 'track':   this.tracks = resource['tracks']['items'];  break;
        case 'album':   this.albums = resource['albums']['items']; console.log(this.artists); break;
        default:        console.error("Unhandled category in spotifyService.searchFor()")
      }
    })
  }

}
