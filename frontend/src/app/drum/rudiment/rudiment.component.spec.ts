import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RudimentComponent } from './rudiment.component';

describe('RudimentComponent', () => {
  let component: RudimentComponent;
  let fixture: ComponentFixture<RudimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RudimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RudimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
