import {Component} from '@angular/core';
import {Calendar} from '@ionic-native/calendar/ngx';
import {NavController, Platform} from '@ionic/angular';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    // calendarName = '';
    // events = [];
    //
    // constructor(private calendar: Calendar, private platform: Platform) {
    //     if (this.platform.is('android')) {
    //         this.calendario();
    //         this.calendarName = 'Agenda';
    //     }
    // }
    //
    // calendario() {
    //     const start = new Date();
    //     const end = new Date();
    //     end.setDate(end.getDate() + 31);
    //
    //     this.calendar.listEventsInRange(start, end)
    //         .then((data) => {
    //             this.events = data;
    //         });
    // }

    // google ionic 3

    calendars = [];

    constructor(public navCtrl: NavController, private calendar: Calendar, private plt: Platform){
        this.plt.ready().then(() => {
            this.calendar.listCalendars().then(data => {
                this.calendars = data;
                // console.log(data);
            });
        });
    }

    addEvent(cal) {
        const date = new Date();
        const options = {
            calendarId: cal.id,
            calendarName: cal.name,
            url: 'https://ionicacademy.com',
            firstReminderMinutes: 15
        };

        this.calendar.createEventInteractivelyWithOptions('My new Event', 'Münster', 'Special Notes', date, date, options).then(res => {
        }, err => {
            console.log('err: ', err);
        });
    }

    openCal(cal) {
        // this.navCtrl.push('CalDetailsPage', {name: cal.name})
        // console.log(cal);
        this.navCtrl.navigateForward('cal-details');
    }
}
