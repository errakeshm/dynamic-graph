import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { DeviceCoreComponent } from './device/components/device-core/device-core.component';
import { DeviceModule } from './device/device.module';

const APPLICATION_ROUTES:Routes =[
    { path:'device', component:DeviceCoreComponent}
];

@NgModule({
    imports:[
        DeviceModule,
        RouterModule.forRoot(APPLICATION_ROUTES)
    ],
    exports:[RouterModule]
})
export class AppRoutesModule{ }