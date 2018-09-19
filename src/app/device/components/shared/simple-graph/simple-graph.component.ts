import { Component, OnInit, Input, AfterContentInit,ViewChild } from '@angular/core';
import { GraphConfigModel,GraphModel } from '../../../models/device.model';
import { DeviceConstants } from '../../../constants/device.constant';
import { UIChart} from 'primeng/primeng';
import { Observable,TimeoutError } from 'rxjs';

import * as moment from 'moment';
@Component({
  selector: 'simple-graph',
  templateUrl: './simple-graph.component.html',
  styleUrls: ['./simple-graph.component.css']
})
export class SimpleGraphComponent implements AfterContentInit {

  constructor() { }
  graphModelConfig:GraphConfigModel;
  graphModel:GraphModel;
  currentData:number;
  isSensorAlive:boolean=true;
  currentDate:string;
  
  @ViewChild('chartComponent') chartComponent:UIChart;
  @Input() noOfObs:number;
  @Input() set setConfig(value:any){
    this.config = value;
  }
  @Input() obsData:Observable<any>;
  config:any;
  ngAfterContentInit(){
    
    this.graphModelConfig = new GraphConfigModel();
    this.graphModelConfig.init(this.config);

    this.graphModel = new GraphModel();
    //5 Represents the number of Observation
    this.graphModel.init(this.graphModelConfig.type,this.graphModelConfig.label,this.graphModelConfig.color,this.graphModelConfig.bckColor);

    this.obsData
      .timeout(DeviceConstants.CONST_TIMEOUT)
      .subscribe(
        yData=>{
          this.currentData = yData;
          this.currentDate = moment().format("MM-DD-YYYY HH:mm:ss");
          let currMoment =moment().format("HH:mm:ss");
          let currIndex = this.graphModel.labels.length;
          if(currIndex < this.noOfObs){
            this.graphModel.labels.push(currMoment);
            this.graphModel.datasets[0].data.push(yData);
          }
          else{
            for(var i=0;i<(this.noOfObs-1);i++){
              this.graphModel.labels[i]=this.graphModel.labels[i+1];
              this.graphModel.datasets[0].data[i]=this.graphModel.datasets[0].data[i+1];
            }
            this.graphModel.labels[(this.noOfObs-1)]=currMoment;
            this.graphModel.datasets[0].data[(this.noOfObs-1)]=yData;
          }
          this.chartComponent.refresh();
        },
        error=>{
          if(error instanceof TimeoutError){
            console.log('Timedout');
          }else{
            console.log("Other errors !!!");
          }
        },
        ()=>{
          this.isSensorAlive = false;
        }
    )
  }
}