import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule,SliderModule,ChartModule,InputTextModule,MessagesModule,BlockUIModule,OverlayPanelModule,ColorPickerModule } from 'primeng/primeng';
//Importing Modules for Angular Material
//import { MatCardModule,MatGridListModule,MatButtonModule,MatFormFieldModule,MatSelectModule } from '@angular/material';
//Importing Components
import { DeviceCoreComponent } from './components/device-core/device-core.component';
import { DeviceSelectionComponent } from './components/device-selection/device-selection.component'
import { WidgetCreateComponent } from './components/widget-create/widget-create.component';
//Importing services
import { DeviceService } from './service/device.service';
import { SimpleGraphComponent } from './components/shared/simple-graph/simple-graph.component';
import { DeviceDashComponent } from './components/device-dash/device-dash.component';


const DEVICE_ROUTES:Routes = [
  {
    path:'device', component:DeviceCoreComponent ,
    children:[
      { path:'select/:type', component:DeviceSelectionComponent},
      { path:'widget/:type/:name', component:DeviceDashComponent}
    ]
  }
]
@NgModule({
  declarations: [
    DeviceCoreComponent,
    DeviceSelectionComponent,
    WidgetCreateComponent,
    SimpleGraphComponent,
    DeviceDashComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DEVICE_ROUTES),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    DropdownModule,
    SliderModule,
    ChartModule,
    InputTextModule,
    BlockUIModule,
    OverlayPanelModule,
    ColorPickerModule,
    MessagesModule
   // DialogModule
    //MatFormFieldModule,
   // MatGridListModule,
    //MatCardModule,
   // MatButtonModule,
   // MatSelectModule
  ],
  providers:[
    DeviceService
  ]
})
export class DeviceModule { }
