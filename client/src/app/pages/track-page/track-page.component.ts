import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id');
  	var trackPromise = this.spotifyService.getTrack(this.trackId);
    var trackFeaturePromise = this.spotifyService.getAudioFeaturesForTrack(this.trackId);

    trackPromise.then((data) => {
      this.track = data; 
    });
    
    trackFeaturePromise.then((audioFeatures) => {
      this.audioFeatures = audioFeatures;
    });


  }

}
