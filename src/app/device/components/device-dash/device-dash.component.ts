import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphModel,ChannelModel } from '../../models/device.model';
import { DeviceService } from '../../service/device.service';
import { DeviceConstants } from '../../constants/device.constant';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-device-dash',
  templateUrl: './device-dash.component.html',
  styleUrls: ['./device-dash.component.css']
})
export class DeviceDashComponent implements OnInit {
  constructor(
    private deviceService:DeviceService,
    private activatedRoute:ActivatedRoute
  ) { }
  data: any;
  config:any=[];
  obsNullData:any;
  currentDeviceName:string;
  ngOnInit() {
    this.currentDeviceName = this.activatedRoute.snapshot.params['name'];
    console.log('DEVICE DASH');
    this.data = this.deviceService.fetchData();
  this.obsNullData=Observable.of(null);
  }
  displayWidget(event:any){
    console.log(event);
    if(event.msg==DeviceConstants.CONST_WIDGET_CREATED){
      let allWidgets:Array<ChannelModel> = this.deviceService.getWidgets(this.currentDeviceName);
      console.log(allWidgets);
      this.config = allWidgets.map(
        (channel:ChannelModel)=>{
          console.log(channel);
          let currChannel =  {'name':channel.location,
          'type':(channel.representation=='bar-chart')?'bar':'line',
          'label':channel.name,
          'unit':channel.unit,
          'threshold':channel.threshold,
          'color':channel.color,
          'operation':channel.operation
          };
          if(currChannel['type']=='bar'){
            currChannel['bckColor']=channel.color;
          }
          return currChannel;
        }
      )
    }
  }
}
