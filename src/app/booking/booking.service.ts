import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  bookRoom(bookingData: any) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', bookingData);
  }
}
