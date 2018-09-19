import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { DeviceService } from '../../service/device.service';
import { CommonUtil } from '../../utils/common.util';

@Component({
  selector: 'app-device-selection',
  templateUrl: './device-selection.component.html',
  styleUrls: ['./device-selection.component.css']
})
export class DeviceSelectionComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private deviceService:DeviceService
  ) { }
  //Device Type Selected
  devTypeSel:string;
  //Device Name
  devNameList:Array<string>;
  
  noOfCols:number=5;
  ngOnInit() {
    console.log('DeviceSelectionComponent.init():start')
    this.activatedRoute.paramMap.subscribe(
      (param:ParamMap)=>{
        this.devTypeSel = param.get('type');
        if(!CommonUtil.isEmpty(this.devTypeSel))
          this.deviceService.fetchDeviceNames(this.devTypeSel).subscribe(
            response=>{
              this.devNameList = response;
            }
          );
      }
    );
    console.log('DeviceSelectionComponent.init():end')
  }

}
