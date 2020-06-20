import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventheaderComponent } from './eventheader.component';

describe('EventheaderComponent', () => {
  let component: EventheaderComponent;
  let fixture: ComponentFixture<EventheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
