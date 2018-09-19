import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDashComponent } from './device-dash.component';

describe('DeviceDashComponent', () => {
  let component: DeviceDashComponent;
  let fixture: ComponentFixture<DeviceDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
