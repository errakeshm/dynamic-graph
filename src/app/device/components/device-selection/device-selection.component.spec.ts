import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSelectionComponent } from './device-selection.component';

describe('DeviceSelectionComponent', () => {
  let component: DeviceSelectionComponent;
  let fixture: ComponentFixture<DeviceSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
