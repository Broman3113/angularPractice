import {Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Room} from "./rooms.interface";
import {HeaderComponent} from "../header/header.component";
import {RoomsService} from "./services/rooms.service";
import {catchError, map, Observable, of, Subject, Subscription} from "rxjs";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'ngp-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | undefined;
  @ViewChildren(HeaderComponent) headerComponents!: QueryList<HeaderComponent>
  roomName = 'Living Room';
  roomsCount = 3;
  isCountVisible = true;
  percentDone = 0;
  subscription !: Subscription;

  ngAfterViewInit(): void {
    this.headerComponents.forEach((h, i) => h.title = `Header ${i + 1}`)
  }

  someValue = 5;
  roomsList: Room[] = [];
  roomsList2$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      this.error$.next(err.message);
      return of([]);
    })
  );
  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();
  roomsCount$ = this.roomsService.getRooms().pipe(
    map(rooms => {
      return rooms.length;
    })
  )
  stream = new Observable((observer) => {
    observer.next("Hello");
    observer.next("World");
    observer.next("!");
    observer.complete();
  })


  // ngAfterViewChecked(): void {
  //   this.headerComponent!.title = 'Rooms';
  // }
  constructor(private roomsService: RoomsService) {
  }

  ngOnInit(): void {
    this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
      this.roomsList = rooms;
    })
    this.stream.subscribe({
      next: (value) => console.log(value + ' from observable'),
      complete: () => console.log('complete'),
      error: (error) => console.log(error)
    });
    this.getPhotos();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

  decreaseRoomsCount() {
    this.roomsCount -= 1;
  }

  increaseRoomsCount() {
    this.roomsCount += 1;
  }

  roomSelected(room: Room) {
    this.roomsList = this.roomsList.filter(r => r.roomNumber !== room.roomNumber);
  }

  onAddRoom() {
    const room: Room = {
      roomType: 'Deluxe Room',
      amenities: "Air Conditioning, Balcony, Wifi",
      price: 600,
      photos: 'https://www.ihg.com/holidayinnexpress/hotels/us/en/atlanta/atlbr/hoteldetail/rooms',
      checkinTime: new Date('2021-01-01'),
      checkoutTime: new Date('2021-01-02'),
      rating: 4.233,
    }
    this.roomsService.addRoom(room).subscribe((room) => {
      this.roomsList = room
    })
  }
  editRoom() {
    const room: Room = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: "Air Conditioning, Balcony, Wifi",
      price: 600,
      photos: 'https://www.ihg.com/holidayinnexpress/hotels/us/en/atlanta/atlbr/hoteldetail/rooms',
      checkinTime: new Date('2021-01-01'),
      checkoutTime: new Date('2021-01-02'),
      rating: 4.233,
    }
    this.roomsService.editRoom(room).subscribe((rooms) => {
      this.roomsList = rooms;
    })
  }
  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((rooms) => {
      this.roomsList = rooms;
    })
  }
  getPhotos() {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Response header has been received!');
          break;
        }
        case HttpEventType.DownloadProgress: {
            this.percentDone = event.loaded
        }
      }
    })
  }
}
