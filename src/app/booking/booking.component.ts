import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookingService} from "./booking.service";
import {mergeMap, Subscription, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {CustomValidator} from "./validators/custom-validator";

@Component({
  selector: 'ngp-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingForm !: FormGroup;
  idParam = '';
  get guestList() {
    return this.bookingForm.get('guestList') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    // this.route.paramMap
    //   .pipe(map(params => params.get('id') as string))
    //   .subscribe(id => this.idParam = id);
    this.idParam = this.route.snapshot.paramMap.get('id') as string;
    this.bookingForm = this.fb.group({
        roomId: new FormControl({value: this.idParam, disabled: true}, {validators: [Validators.required]}), // The same as ['']
        guestEmail: [
          '',
          {
            validators: [Validators.required, Validators.email],
            updateOn: 'blur'
          }
        ],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        guestName: ['', [Validators.required, CustomValidator.ValidateName, CustomValidator.ValidateSpecialChar('*')]],
        address: this.fb.group({
          addressLine1: ['', [Validators.required]],
          addressLine2: [''],
          city: [''],
          state: [''],
          country: [''],
          zipCode: [''],
        }),
        guestCount: [''],
        guestList: this.fb.array([
          this.fb.group({
            guestName: new FormControl('', {validators: [Validators.required]}),
            age: new FormControl(''),
          })
        ]),
        tnc: [false, [Validators.requiredTrue]]
      },
      {
        updateOn: 'change', // 'change' is the default value for updateOn
        validators: [CustomValidator.ValidateDate]
      })
    // this.bookingForm.valueChanges.subscribe(value => {
    //   this.bookingService.bookRoom(value).subscribe(data => {
    //     console.log(data);
    //   })
    // })

    // RXjs Map Operators
    // this.bookingForm.valueChanges.pipe(
    //   mergeMap(value => this.bookingService.bookRoom(value)) // mergeMap doesn't care about the order of the responses
    //   // switchMap(value => this.bookingService.bookRoom(value)) // switchMap cares about the order of the responses and cancels the previous requests
    //   // exhaustMap(value => this.bookingService.bookRoom(value)) // exhaustMap cares about the order of the responses and doesn't send the new request if the previous one is not completed
    // ).subscribe(data => {
    //   console.log(data);
    // })
  }

  ngAfterContentInit() {
    this.getBookingData();
  }

  addBooking() {
    console.log(this.bookingForm.value);
    console.log(this.bookingForm.getRawValue()); // Allows to get the disabled values
    this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe(response => {
      console.log(response);
    });
    this.resetForm();
  }

  resetForm() {
    this.bookingForm.reset({ // patchValue is the same as setValue, but it allows to set only the values that we want to set
      roomId: this.idParam,
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      },
      guestCount: '',
      guestList: [],
      tnc: false
    })
  }

  addGuest() {
    this.guestList.push(
      this.fb.group({
        guestName: new FormControl('', {validators: [Validators.required]}),
        age: new FormControl(''),
      })
    )
  }

  removeGuest(index: number) {
    this.guestList.removeAt(index);
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.contains('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  getBookingData() {

    this.bookingForm.patchValue({ // patchValue is the same as setValue, but it allows to set only the values that we want to set
      roomId: this.idParam,
      guestEmail: 'broman3113@gmail.com',
      checkinDate: new Date(),
      checkoutDate: new Date(),
      bookingStatus: 'Confirmed',
      bookingAmount: 1000,
      bookingDate: new Date(),
      mobileNumber: '1234567890',
      guestName: 'Bharat',
      address: {
        addressLine1: 'Address Line 1',
        addressLine2: 'Address Line 2',
        city: 'City',
        state: 'State',
        country: 'Country',
        zipCode: '123456'
      },
      guestCount: '',
      guestList: [],
      tnc: false
    })
  }
}

export interface Booking {
  roomId: string;
  guestEmail: string;
  checkinDate: Date;
  checkoutDate: Date;
  bookingStatus: string;
  bookingAmount: number;
  bookingDate: Date;
  mobileNumber: string;
  guestName: string;
  guestAddress: string;
  guestCity: string;
  guestState: string;
  guestCountry: string;
  guestZipCode: string;
  guestCount: number;
  guestList: []
}
