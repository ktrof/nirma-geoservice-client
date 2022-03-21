import {AfterViewInit, Component} from '@angular/core';
import {DistributionService} from '../distribution.service';
import * as L from 'leaflet';
import 'leaflet.heat';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NirmaModel} from '../model/nirma-model';
import {DistrictService} from '../district.service';

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
export class MapComponent implements AfterViewInit{

  constructor(private districtService: DistrictService, private distributionService: DistributionService, private fb: FormBuilder) {
    this.mapForm = this.fb.group({
      requestParam: '',
      innerModel: this.fb.group({
        requestParam: ''
      })
    });
  }

  private map!: L.Map;

  mapForm!: FormGroup;

  innerModels: Array<NirmaModel> = [
    new NirmaModel('social_infrastructure', 'Социальная инфраструктура (школы, сады, детские площадки, больница)', null),
    new NirmaModel('education', 'Образовательные учреждения', null),
    new NirmaModel('health', 'Здоровый образ жизни (площадки, спортивные объекты)', null),
    new NirmaModel('entertainment', 'Развлекательные объекты', null),
    new NirmaModel('other', 'Дополнительные объекты (культурные, вело, раздельный сбор мусора, площадки для животных)', null)
  ];

  nirmaModels: Array<NirmaModel> = [
    new NirmaModel(null, 'Распределение потребностей в инфраструктуре по районам', this.innerModels),
    new NirmaModel('Авария', 'Распределение ДТП', null),
    new NirmaModel('Угон', 'Распределение угонов', null),
    new NirmaModel('Пожар', 'Распределение пожаров', null),
  ];

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {

    console.log('Initializing map...');

    this.map = L.map('map', {
      center: [ 59.931610, 30.355301 ],
      zoom: 11
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    console.log('Map initialized');

  }

  initHeatmap(requestParam: string): void {
    const accidents: string[] = this.nirmaModels.map(model => model.requestParam).filter(model => model !== null);
    if (accidents.includes(requestParam)) {
      this.distributionService.removeHeatMap(this.map);
      this.districtService.removeLayer(this.map);
      const observable: Observable<L.GeoJSON> = this.distributionService.makeHeatmap(this.map, requestParam);
      observable.subscribe();
    }
  }

  initDistricts(dataType: string): void {
    this.distributionService.removeHeatMap(this.map);
    this.districtService.removeLayer(this.map);
    this.districtService.makeLayer(this.map, dataType);
  }

  resetComponent(): void {
    this.mapForm.reset();
    this.distributionService.removeHeatMap(this.map);
    this.districtService.removeLayer(this.map);
  }

  resetInnerForm(): void {
    this.mapForm.get('innerModel')?.reset();
    this.districtService.removeLayer(this.map);
  }

}
