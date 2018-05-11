import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RudimentListComponent } from './rudiment-list.component';

describe('RudimentListComponent', () => {
  let component: RudimentListComponent;
  let fixture: ComponentFixture<RudimentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RudimentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RudimentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
