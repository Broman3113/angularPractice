import {AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {RoomsComponent} from "./rooms/rooms.component";
import {InitService} from "./init.service";
import {ConfigService} from "./services/config.service";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {ShareddataService} from "./services/shareddata.service";

@Component({
  selector: 'ngp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'angularPractice';
  @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;
  @ViewChild('hotel', {static: true}) hotel!: ElementRef;

  constructor(
    private initService: InitService,
    private configService: ConfigService,
    private router: Router,
    private shareddataService: ShareddataService
  ) {
    console.log('App initializer: ', this.initService.config)
  }

  ngOnInit(): void {
    this.shareddataService.setMessage('Hello');
    this.shareddataService.message.subscribe((message) => {
      console.log(message);
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart) // filter out all events that are not NavigationStart
    ).subscribe((event) => {
      console.log('NavigationStart event: ', event);
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // filter out all events that are not NavigationEnd
    ).subscribe((event) => {
      console.log('NavigationEnd event: ', event);
    });
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // })
    this.hotel.nativeElement.innerText = 'Hotel California';
  }

  ngAfterViewInit(): void {
    const componentRef = this.vcr.createComponent(RoomsComponent);
    componentRef.instance.roomName = 'Bedroom';
  }
}
