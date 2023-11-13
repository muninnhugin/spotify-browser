import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');

    var artistPromise = this.spotifyService.getArtist(this.artistId);
    var topTrackPromises = this.spotifyService.getTopTracksForArtist(this.artistId);
    var relatedArtistsPromises = this.spotifyService.getRelatedArtists(this.artistId);
    var albumPromises = this.spotifyService.getAlbumsForArtist(this.artistId);

    artistPromise.then((result) => {
      this.artist = result;
    });

    topTrackPromises.then((tracks) => {
      this.topTracks = tracks;
    });

    relatedArtistsPromises.then((artists) => {
      this.relatedArtists = artists;
    });

    albumPromises.then((albums) => {
      this.albums = albums;
    });
    
  }

}