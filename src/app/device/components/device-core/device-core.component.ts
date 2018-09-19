import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../service/device.service';

@Component({
  selector: 'app-device-core',
  templateUrl: './device-core.component.html',
  styleUrls: ['./device-core.component.css']
})
export class DeviceCoreComponent implements OnInit {

  constructor(
    private deviceService:DeviceService    
  ) { }
  //For defining the list of device types
  deviceTypes:Array<string>;
  ngOnInit() {
    console.log('DeviceCoreComponent.init():start')
    //Calls Service to fetch the list of device types
    this.deviceService.fetchDeviceTypes().subscribe(
      response=>{
        this.deviceTypes = response;
        console.log(this.deviceTypes);
      }
    );
    console.log('DeviceCoreComponent.init():end')
  }
}
