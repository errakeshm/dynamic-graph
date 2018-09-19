import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http,Response } from '@angular/http';
import { DeviceModel,ChannelModel } from '../models/device.model';
@Injectable()
export class DeviceService {

  constructor(
    private http:Http
  ) { }
  widgets:any=[];
  /**
   * For fetching the device types
   */
  fetchDeviceTypes():Observable<Array<string>>{
    return Observable.of(["SENSOR 1","SENSOR 2"]);
  }
  /**
   * For fetching the device names associated with a device type
   * @param pDeviceType 
   */
  fetchDeviceNames(pDeviceType:string):Observable<Array<string>>{
    console.log(pDeviceType);
    if(pDeviceType=="GEN")
      return Observable.of(["GEN-SENS1","GEN-SENS2","GEN-SENS3"]);
    else
      return Observable.of(["MACH-SENS1","MACH-SENS2","MACH-SENS3"]);
  }
  fetchDevLoc(pDeviceName:string){
    let response = {
    "DEVICE_DATA":
      {
         "channel0" : {"bedroom1":["temperature","45","C"]},
         "channel1" : {"garden_temperature":["temperature","25","C"]}
      }
    };
    return Observable.of(Object.keys(response["DEVICE_DATA"]).filter(
      (key:string)=>key.search(/channel/)>-1
    ).map(channelName=>{
      let location = Object.keys(response["DEVICE_DATA"][channelName])[0];
      return {label:location,value:location}
      //return {label:channelName,value:channelName}        
    }));
  }
  /**
   * This is for fetching device data when a device is selected from the device selection page
   * @param pDeviceName 
   */
  fetchDeviceData(pDeviceName:string):any{
    console.log('Done',pDeviceName);
      console.log('Called');
      return Observable.of({"DEVICE_DATA":
      {
         "channel0" : {"bedroom1":["temperature","45","C"]},
         "channel1" : {"garden_temperature":["temperature","25","C"]}
      }
    });
  }
  fetchData() {
    return Observable.of("")
           .switchMap(() => Observable
           .timer(2000)
           .mapTo(this.getRandomNumber()))
           .repeat();
  }
  getRandomNumber(){
    return Math.random()*30;
  }
  addWidget(device:any){
    console.log('Adding widget');
    this.widgets.push(device);
    return true;
  }
  showData(){
    console.log(this.widgets);
  }
  getWidgets(deviceName:string){
    console.log(this.widgets);
    let allChannels:Array<ChannelModel>;
    this.widgets
          .filter((device:DeviceModel)=>device.deviceName==deviceName)
          .forEach((device:DeviceModel)=>{
            console.log(device);
            allChannels = device.channel;
    });
    console.log(allChannels);
    return allChannels;
  }
}
