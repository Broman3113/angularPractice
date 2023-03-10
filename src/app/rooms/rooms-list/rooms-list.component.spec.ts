import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsListComponent } from './rooms-list.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FilterPipe} from "../filter.pipe";

describe('RoomsListComponent', () => {
  let component: RoomsListComponent;
  let fixture: ComponentFixture<RoomsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsListComponent, FilterPipe ],
      imports: [
        MatProgressSpinnerModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
