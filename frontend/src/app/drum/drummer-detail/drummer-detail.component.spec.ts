import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrummerDetailComponent } from './drummer-detail.component';

describe('DrummerDetailComponent', () => {
  let component: DrummerDetailComponent;
  let fixture: ComponentFixture<DrummerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrummerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrummerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
