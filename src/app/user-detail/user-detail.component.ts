import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { icon, map, marker, tileLayer } from 'leaflet';

import { User } from '../user';
import { State, updateUser } from '../reducers';

function fastDeepObjectCloning<T extends object>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

const markerIcon = {
  icon: icon({
    iconSize: [25, 41],
    iconAnchor: [13, 0],
    iconUrl: './assets/marker-icon.png',
    shadowUrl: './assets/marker-shadow.png',
  }),
};

enum Tab {
  PROFILE = 'PROFILE',
  LOCATION = 'LOCATION',
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass'],
})
export class UserDetailComponent implements OnDestroy {
  activeTab = Tab.PROFILE;
  private map!: L.Map;
  private marker!: L.Marker;
  private userInternal!: User;

  constructor(private store: Store<State>) {}

  @Input()
  set user(user: User) {
    this.userInternal = fastDeepObjectCloning(user);
    setTimeout(() => {
      if (!this.map) {
        this.map = map('map');
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
      }

      this.moveMarker(this.map, {
        lat: user.location.coordinates.latitude,
        lng: user.location.coordinates.longitude,
      });
    }, 0);
  }

  get user(): User {
    return this.userInternal;
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  activateProfileTab($event: Event): void {
    $event.preventDefault();
    this.activeTab = Tab.PROFILE;
  }

  activateLocationTab($event: Event): void {
    $event.preventDefault();
    this.activeTab = Tab.LOCATION;
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  saveForm(): void {
    if (this.user) {
      this.store.dispatch(updateUser(this.user));
      // TODO: use binding for coordinates?
      this.moveMarker(this.map, {
        lat: this.user.location.coordinates.latitude,
        lng: this.user.location.coordinates.longitude,
      });
    }
  }

  private moveMarker(mapInstance: L.Map, coordinates: { lat: number; lng: number }) {
    mapInstance.setView(coordinates, 12);

    if (this.marker) {
      this.marker.remove();
    }
    this.marker = marker(coordinates, markerIcon)
      .addTo(mapInstance)
      .bindPopup('Good work!');
  }
}
