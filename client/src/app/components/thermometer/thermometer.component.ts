import { Component, OnInit, Input} from '@angular/core';
import { TrackFeature } from 'src/app/data/track-feature';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //define Input fields and bind them to the template.
  @Input() feature:TrackFeature;
  percentString:string;
  color:any;

  constructor() { }

  ngOnInit() {
    this.percentString = this.feature.percentageString;
    this.color = this.feature.color;
  }

}
