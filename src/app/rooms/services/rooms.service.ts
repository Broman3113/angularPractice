import {Inject, Injectable} from '@angular/core';
import {Room} from "../rooms.interface";
import {APP_SERVICE_CONFIG} from "../../AppConfig/appconfig.service";
import {AppConfig} from "../../AppConfig/appconfig.interface";
import {localstorageToken} from "../../localstorage.token";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  rooms: Room[] = []

  getRooms$ = this.http.get<Room[]>('/api/rooms').pipe(
    shareReplay(1)
  )
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
    // @Inject(localstorageToken) private localStorage: Storage
  ) {
    console.log(this.config.apiEndpoint)
    // this.localStorage.setItem('test', 'test')
  }

  getRooms() {
    return this.http.get<Room[]>('/api/rooms');
  }

  addRoom(room: Room) {
    return this.http.post<Room[]>('api/rooms', room)
  }

  editRoom(room: Room) {
    return this.http.put<Room[]>(`/api/rooms/${room.roomNumber}`, room)
  }

  deleteRoom(id: string) {
    return this.http.delete<Room[]>(`/api/rooms/${id}`)
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      {
        reportProgress: true
      }
    )
    return this.http.request(request);
  }
}
