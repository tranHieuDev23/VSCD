import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListenComfirmPageComponent } from './listen-comfirm-page.component';

describe('ListenComfirmPageComponent', () => {
  let component: ListenComfirmPageComponent;
  let fixture: ComponentFixture<ListenComfirmPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenComfirmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenComfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
