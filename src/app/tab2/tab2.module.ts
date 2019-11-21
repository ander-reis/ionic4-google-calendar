import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab2Page} from './tab2.page';
import {NgCalendarModule} from 'ionic2-calendar';
import {Calendar} from '@ionic-native/calendar/ngx';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab2Page}]),
        NgCalendarModule
    ],
    providers: [Calendar],
    declarations: [Tab2Page]
})
export class Tab2PageModule {
}
