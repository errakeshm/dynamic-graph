//Model pertaining to each channel
export class ChannelModel{
    /*key:string;//Location of the sensor for devices other than flint
    value:any;//reading of the channel
    frequency:number;//Frequence of refresh
    visualization:string; //Whether this is graph*/
    name:string;
    location:string;
    representation:string;
    interval:string;
    threshold:number;
    operation:string;
    unit:string;
    color:string;
}
//Model for the device
export class DeviceModel{
    deviceType:string;
    deviceName:string;
    channel:Array<ChannelModel>;
    initialize(pDeviceType:string,pDeviceName:string){
        this.deviceName = pDeviceName;
        this.deviceType = pDeviceType;
        this.channel = new Array<ChannelModel>();
    }
    addChannel(pChannel:ChannelModel){
        this.channel= [...this.channel,pChannel];
    }
}
export interface GraphConfigModelI{
    name:String;
    type:string;
    color:string;
    label:string;
    threshold:number;
}
export class DataSet{
    //type:string;
    fill:boolean=false;
    label:string;
    data:Array<number>;
    borderColor:string;
    backgroundColor:string="#000000";
    constructor(){
        this.data = new Array<number>();
    }
}
export class GraphModel{
    labels:Array<string>;
    datasets:Array<DataSet>;
    constructor(){
        this.datasets = new Array<DataSet>();
    }
    init(pType:string,pLabel:string,pBorderClr:string,pBckColor?:string){
        this.datasets[0] = new DataSet();
        this.datasets[0].label = pLabel;
        this.datasets[0].borderColor = pBorderClr;
        this.datasets[0].backgroundColor = pBckColor;
        //this.datasets.type = pType;
        this.labels = new Array<string>();
    }
}
export class GraphConfigModel implements GraphConfigModelI{
    name:string;
    type:string;
    color:string;
    label:string;
    threshold:number;
    bckColor:string='#000000';
    operation:string;
    init(pConfig:GraphConfigModelI){
        if(pConfig!=null && typeof pConfig!='undefined'){
            Object.keys(pConfig).forEach(
                key=>{
                    this[key] = pConfig[key];
                }
            )
        }
    }
}