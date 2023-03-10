import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable, Subscription} from "rxjs";

@Component({
  selector: 'ngp-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit, OnDestroy{

  // id$ = this.router.params.pipe(map(params => params['id']))
  id$ = this.router.paramMap.pipe(map(params => params.get('id'))) // this is the same as the line above but using paramMap instead of params
  // id !: Observable<string>;
  // idSubscription !: Subscription; // we are creating a subscription to the observable

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.id = this.router.snapshot.params['id']; // this is not reactive which means that if the id changes and the view is not re-rendered, the id will not change
    // this.idSubscription = this.router.params.subscribe(params => {
    //   this.id = params['id']; // this is reactive which means that if the id changes and the view is re-rendered, the id will change, but we need to unsubscribe from the subscription
    // })
  }
  ngOnDestroy(): void {
    // this.idSubscription.unsubscribe(); // this is needed to prevent memory leaks
  }
}
