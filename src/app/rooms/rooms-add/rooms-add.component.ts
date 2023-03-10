import {Component, ViewChild} from '@angular/core';
import {Room} from "../rooms.interface";
import {RoomsService} from "../services/rooms.service";
import {NgForm, NgModel} from "@angular/forms";

@Component({
  selector: 'ngp-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent {
  room: Room = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0,
  }


  constructor(private roomService: RoomsService) {

  }
  addRoom(roomsForm: NgForm) {
    this.roomService.addRoom(this.room).subscribe((data) => {
      console.log(data);
      roomsForm.reset();
    })
  }
}
