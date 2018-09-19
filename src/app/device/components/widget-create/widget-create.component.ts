import { Component, OnInit,Output,EventEmitter  } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { DeviceModel,ChannelModel } from '../../models/device.model';
import { DeviceService } from '../../service/device.service';
import { SelectItem } from 'primeng/primeng';
import { DeviceConstants } from '../../constants/device.constant';
@Component({
  selector: 'widget-create',
  templateUrl: './widget-create.component.html',
  styleUrls: ['./widget-create.component.css']
})
export class WidgetCreateComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private deviceService:DeviceService,
    private fb:FormBuilder
  ) { }
  @Output() onWidgetCreate = new EventEmitter<any>();
  //Represents the details of the device selected
  device:DeviceModel;

  //channels:Array<SelectItem>;
  representation:Array<SelectItem>;
  intervals:Array<SelectItem>;
  locations:Array<SelectItem>;
  operations:Array<SelectItem>;
  units:Array<SelectItem>;
  devWidgForm:FormGroup;
  devWidgFormErrors:any={};
  hasMsg:boolean=false;
  disabled:boolean=true;
  messages:Array<any>=[];

  ngOnInit() {
    //Initialize the representation
    this.representation = DeviceConstants.CONST_DEVICE_GRAPH;   
    //Initialize Intervals
    this.intervals = DeviceConstants.CONST_INTERVAL;
    //Initializing ops
    this.operations = DeviceConstants.CONST_OPS;
    //Initializing form
    this.units = DeviceConstants.CONST_UNITS;
    //
    this.devWidgForm = this.fb.group({
      name:[null,[Validators.required]],
      location:[null,[Validators.required]],
      representation:[null,[Validators.required]],
      interval:[null,[Validators.required]],
      threshold:[null,[Validators.required]],
      operation:[null,[Validators.required]],
      unit:[null,[Validators.required]],
      color:[null,[Validators.required]]
    });
    //Initializing message
    this.messages = [{severity:'success', summary:'Success: ', detail:'Your widget was created !'}];
    //initializing Form Errors
    this.initFormErrors();
    //Create a Device Model
    this.device = new DeviceModel();
    this.device.initialize(this.activatedRoute.snapshot.params['type'],this.activatedRoute.snapshot.params['name']);
     //Fetch Location List
    this.deviceService.fetchDevLoc(this.device.deviceName).subscribe(
    data=>{
      this.locations = data;
      }
    );
  }
  initFormErrors(){
    //Initializing Errors
    Object.keys(this.devWidgForm.controls).forEach(
      val=>{
        this.devWidgFormErrors[val]={valid:true,msg:''};
      }
    );
    //console.log(this.devWidgFormErrors);
  }
  //Reset the form
  reset(){
    this.disabled=true;
    this.initFormErrors();
    this.devWidgForm.reset();
    //this.device.channel=new Array<ChannelModel>();
  }
  //Submit the Form
  submit(){
    let status:boolean = true;
    //Creating widget
    if(!this.devWidgForm.valid){
      Object.keys(this.devWidgForm.controls).filter(key=>this.devWidgForm.controls[key].invalid).forEach(
        key=>{
          Object.keys(this.devWidgForm.controls[key].errors).forEach(
            error=>{
              status = false;
              this.devWidgFormErrors[key].valid=false;
              this.devWidgFormErrors[key].msg=error;
            }
          )
        }
      );
    }
    //console.log(status);
    if(status){
      let channel:ChannelModel = this.devWidgForm.getRawValue();
      //console.log(channel);
      this.device.addChannel(channel);
      let result = this.deviceService.addWidget(this.device);
      if(result==true){
        this.hasMsg = true;
        this.reset();
        this.onWidgetCreate.emit({msg:DeviceConstants.CONST_WIDGET_CREATED});
      }
      //console.log(this.device);
    }
    //console.log(this.devWidgFormErrors);
  }
  //Populate Form fields
  populateForm(event:any){
    //console.log(event.value);
    //this.deviceService.fetchLocations()
    this.disabled = false;
  }
}
