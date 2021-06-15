import {Injectable} from '@angular/core';
import * as G from 'geojson';
import * as L from 'leaflet';
import {FeatureGroup, GeoJSON, LatLng, Layer, Point} from 'leaflet';
import 'leaflet.heat';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  private uri  = 'http://localhost:8080/features';

  makeCarCrashHeatmap(map: L.Map): Observable<L.GeoJSON> {
    const heatLayer: L.HeatLayer = L.heatLayer(new Array<L.LatLng>(), {
      radius: 25
    }).addTo(map);
    return new Observable<L.GeoJSON>((observer) => {
      const url = this.uri + '?topic=Авария';
      const eventSource = new EventSource(url);
      eventSource.onmessage = (event: any) => {
        const feature: G.Feature<G.Point, any> = JSON.parse(event.data);
        console.log(feature);
        observer.next(L.geoJSON<any>(feature, {
          pointToLayer(geoJsonPoint: G.Feature<G.Point, any>, latlng: LatLng): Layer {
            return heatLayer.addLatLng(latlng);
          }
        }));
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
  }
}
