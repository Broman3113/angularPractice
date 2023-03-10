import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Room} from "../rooms.interface";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'ngp-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush // This is the key to make the component not to be re-rendered when the parent component is re-rendered
})
export class RoomsListComponent{
  @Input() rooms: Room[] | null = [];
  @Input() roomsCount = 0;
  @Input() price = null as number | null;
  @Output() roomSelected = new EventEmitter<Room>();

  ngOnInit(): void {
    console.log('RoomsListComponent - ngOnInit');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['roomsCount']) {
      this.roomsCount = changes['roomsCount'].currentValue; // Here we can do some logic to change the value
    }
  }
  onRoomSelected(room: Room) {
    this.roomSelected.emit(room);
  }
}
