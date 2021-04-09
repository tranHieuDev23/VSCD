import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpeakComfirmPageComponent } from './speak-comfirm-page.component';

describe('SpeakComfirmPageComponent', () => {
  let component: SpeakComfirmPageComponent;
  let fixture: ComponentFixture<SpeakComfirmPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakComfirmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakComfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
