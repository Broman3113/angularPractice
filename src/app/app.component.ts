import {AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {RoomsComponent} from "./rooms/rooms.component";
import {InitService} from "./init.service";

@Component({
  selector: 'ngp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit{
  title = 'angularPractice';
  @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;
  @ViewChild('hotel', {static: true}) hotel!: ElementRef;
  constructor(
    private initService: InitService,
  ) {
    console.log('App initializer: ',this.initService.config)
  }
  ngOnInit(): void {
    this.hotel.nativeElement.innerText = 'Hotel California';
  }
  ngAfterViewInit(): void {
    const componentRef = this.vcr.createComponent(RoomsComponent);
    componentRef.instance.roomName = 'Bedroom';
  }
}
