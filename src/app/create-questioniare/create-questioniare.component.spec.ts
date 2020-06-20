import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestioniareComponent } from './create-questioniare.component';

describe('CreateQuestioniareComponent', () => {
  let component: CreateQuestioniareComponent;
  let fixture: ComponentFixture<CreateQuestioniareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuestioniareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestioniareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
