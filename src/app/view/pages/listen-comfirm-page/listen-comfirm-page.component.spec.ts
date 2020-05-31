import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenComfirmPageComponent } from './listen-comfirm-page.component';

describe('ListenComfirmPageComponent', () => {
  let component: ListenComfirmPageComponent;
  let fixture: ComponentFixture<ListenComfirmPageComponent>;

  beforeEach(async(() => {
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
