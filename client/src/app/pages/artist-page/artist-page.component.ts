import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';
// import { TrackListComponent } from 'src/app/components/track-list/track-list.component';

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

    artistPromise.then((result) =>{
      this.artist = result;
    });

    topTrackPromises.then((tracks)=>{
      this.topTracks = tracks;
    });
    
  }

}