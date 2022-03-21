import {Injectable} from '@angular/core';
import * as G from 'geojson';
import * as L from 'leaflet';
import * as C from 'chroma-js';
import 'leaflet.heat';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  private layer!: L.GeoJSON;
  private districts!: Array<G.Feature<G.MultiPolygon, any>>;
  private colorGradient: C.Scale = C.scale(['red', 'orange', 'yellow', 'green']);

  constructor() {
    this.setDistrictData();
    setInterval(this.setDistrictData, 60000);
  }

  removeLayer(map: L.Map): void {
    if (map.hasLayer(this.layer)) {
      map.removeLayer(this.layer);
    }
  }

  makeLayer(map: L.Map, dataType: string): void {
    this.removeLayer(map);
    const featureCollection: G.FeatureCollection<G.MultiPolygon, any> = {
      type: 'FeatureCollection',
      features: this.districts
    };
    this.layer = L.geoJSON(featureCollection, {
      style: feature => this.getColor(feature as G.Feature<G.MultiPolygon, any>, this.districts, dataType),
      // tslint:disable-next-line:typedef
      onEachFeature(feature: G.Feature<G.GeometryObject, any>, layer: L.Layer) {
        layer.bindPopup(`<b>${feature.properties.name}</b><br>Значение параметра: ${feature.properties[dataType]}`);

      }
    });
    this.layer.addTo(map);
  }

  private setDistrictData(): void {
    const districtData: Array<G.Feature<G.MultiPolygon, any>> = new Array<G.Feature<G.MultiPolygon, any>>();
    console.log('Staring retrieving district data from server');
    const url = environment.apiUrl + '/districts';
    const observable = new Observable<any>((observer) => {
      console.log(url);
      const eventSource = new EventSource(url);
      eventSource.onmessage = (event: any) => {
        observer.next(JSON.parse(event.data));
      };
      eventSource.onerror = (error) => {
        if (eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      };
    });
    observable.subscribe(val => districtData.push(val));
    this.districts = districtData;
  }

  private getNormalizedValue(givenFeature: G.Feature<G.MultiPolygon, any>,
                             arrayOfFeatures: Array<G.Feature<G.MultiPolygon, any>>,
                             givenProperty: string): number {
    const maxPropertyValue: number = arrayOfFeatures
      .map(feature => feature.properties[givenProperty])
      .reduce((val1, val2) => val2 >= val1 ? val2 : val1);
    const minPropertyValue: number = arrayOfFeatures
      .map(feature => feature.properties[givenProperty])
      .reduce((val1, val2) => val2 < val1 ? val2 : val1);
    return (givenFeature.properties[givenProperty] - minPropertyValue) / (maxPropertyValue - minPropertyValue);
  }

  private getColor(givenFeature: G.Feature<G.MultiPolygon, any>,
                   arrayOfFeatures: Array<G.Feature<G.MultiPolygon, any>>,
                   givenProperty: string): L.PathOptions {
    const normalizedValue: number = this.getNormalizedValue(givenFeature, arrayOfFeatures, givenProperty);
    return {
      fillOpacity: 0.6,
      fillColor: this.colorGradient(normalizedValue).toString(),
      stroke: false
    };
  }

}
