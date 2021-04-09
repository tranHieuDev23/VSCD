import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListenPageComponent } from './listen-page.component';

describe('ListenPageComponent', () => {
  let component: ListenPageComponent;
  let fixture: ComponentFixture<ListenPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
