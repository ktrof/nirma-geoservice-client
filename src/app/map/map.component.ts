import {AfterViewInit, Component} from '@angular/core';
import {DistributionService} from '../distribution.service';
import * as L from 'leaflet';
import 'leaflet.heat';
import {Observable} from 'rxjs';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map!: L.Map;

  constructor(private distributionService: DistributionService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.initCarCrashHeatmap();
  }

  private initMap(): void {

    this.map = L.map('map', {
      center: [ 59.931610, 30.355301 ],
      zoom: 11
    });

    const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

  }

  private initCarCrashHeatmap(): void {
    const observable: Observable<L.GeoJSON> = this.distributionService.makeCarCrashHeatmap(this.map);
    observable.subscribe();
  }
}
