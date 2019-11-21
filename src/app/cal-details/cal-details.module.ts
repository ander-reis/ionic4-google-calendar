import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CalDetailsPage} from './cal-details.page';

import {Calendar} from '@ionic-native/calendar/ngx';

const routes: Routes = [
    {
        path: '',
        component: CalDetailsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        Calendar
    ],
    declarations: [CalDetailsPage]
})
export class CalDetailsPageModule {
}
