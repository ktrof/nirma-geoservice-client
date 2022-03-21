import {Injectable} from '@angular/core';
import * as G from 'geojson';
import * as L from 'leaflet';
import 'leaflet.heat';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  private uri = environment.apiUrl + '/accidents?topic=';

  private heatLayer: L.HeatLayer = L.heatLayer(new Array<L.LatLng>(), {
    radius: 30,
    blur: 30,
  });

  removeHeatMap(map: L.Map): void {
    if (map.hasLayer(this.heatLayer)) {
      map.removeLayer(this.heatLayer);
    }
  }

  makeHeatmap(map: L.Map, param: string): Observable<L.GeoJSON> {
    const layer: L.HeatLayer = this.heatLayer.addTo(map);
    layer.setLatLngs(new Array<L.LatLng>());
    return new Observable<L.GeoJSON>((observer) => {
      const url = this.uri + param;
      console.log(url);
      const eventSource = new EventSource(url);
      eventSource.onmessage = (event: any) => {
        const feature: G.Feature<G.Point, any> = JSON.parse(event.data);
        observer.next(L.geoJSON<any>(feature, {
          pointToLayer(geoJsonPoint: G.Feature<G.Point, any>, latlng: L.LatLng): L.Layer {
            switch (param) {
              case 'Угон':
                return layer.addLatLng([latlng.lat, latlng.lng, 8.0]);
              case 'Пожар':
                return layer.addLatLng([latlng.lat, latlng.lng, 6.0]);
              default:
                return layer.addLatLng([latlng.lat, latlng.lng, 1.5]);
            }
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
