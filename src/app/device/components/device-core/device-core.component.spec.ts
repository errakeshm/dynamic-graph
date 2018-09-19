import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCoreComponent } from './device-core.component';

describe('DeviceCoreComponent', () => {
  let component: DeviceCoreComponent;
  let fixture: ComponentFixture<DeviceCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
