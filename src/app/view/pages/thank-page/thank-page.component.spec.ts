import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThankPageComponent } from './thank-page.component';

describe('ThankPageComponent', () => {
  let component: ThankPageComponent;
  let fixture: ComponentFixture<ThankPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
