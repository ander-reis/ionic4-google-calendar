import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {AlertController} from '@ionic/angular';
import {formatDate} from '@angular/common';
import {Calendar} from '@ionic-native/calendar/ngx';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    event = {
        title: '',
        desc: '',
        startTime: '',
        endTime: '',
        allDay: false
    };

    minDate = new Date().toISOString();

    eventSource = [];
    viewTitle;

    calendar = {
        mode: 'month',
        currentDate: new Date(),
    };

    @ViewChild(CalendarComponent) myCal: CalendarComponent;
    collapseCard: boolean;

    constructor(private alertCtrl: AlertController,
                @Inject(LOCALE_ID) private locale: string,
                private androidCalendar: Calendar) {
    }

    ngOnInit() {
        this.resetEvent();
        this.loadGoogleEvents();
        this.collapseCard = true;
    }

    resetEvent() {
        this.event = {
            title: '',
            desc: '',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            allDay: false
        };

    }

    // Create the right event format and reload source
    addEvent() {
        const eventCopy = {
            title: this.event.title,
            startTime: new Date(this.event.startTime),
            endTime: new Date(this.event.endTime),
            allDay: this.event.allDay,
            desc: this.event.desc
        };

        if (eventCopy.allDay) {
            const start = eventCopy.startTime;
            const end = eventCopy.endTime;
            eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
            eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
        }

        /**
         * google
         */
            // var date = new Date();

        const options = {
                calendarId: 1,
                // calendarName: cal.name,
                // url: 'https://ionicacademy.com',
                // firstReminderMinutes: 15
            };

        // const startDate = new Date(2019, 5, 17, 15, 0, 0, 0);
        const startDate = new Date(this.event.startTime);
        // const endDate = new Date(2019, 5, 17, 18, 0, 0, 0);
        const endDate = new Date(this.event.endTime);
        const title = this.event.title;
        const eventLocation = 'Home';
        const notes = this.event.desc;
        const success = function(message) {
            alert('Success: ' + JSON.stringify(message));
        };
        const error = function(message) {
            alert('Error: ' + message);
        };

        console.log(new Date());

        // this.androidCalendar.createEvent(title, eventLocation, notes, startDate, endDate)
        this.androidCalendar.createEvent('My new Event', 'Münster', 'Special Notes', startDate, endDate)
            .then((res) => {
                console.log('evento criado: ' + res);
            }, (err) => {
                console.log('err: ', err);
            });

        this.eventSource.push(eventCopy);
        this.myCal.loadEvents();
        this.resetEvent();
    }

    // Change current month/week/day
    next() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    }

    back() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    }

    // Change between month/week/day
    changeMode(mode) {
        this.calendar.mode = mode;
    }

    // Focus today
    today() {
        this.calendar.currentDate = new Date();
    }

    // Selected date reange and hence title changed
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    // Calendar event was clicked
    async onEventSelected(event) {
        // Use Angular date pipe for conversion
        const start = formatDate(event.startTime, 'medium', this.locale);
        const end = formatDate(event.endTime, 'medium', this.locale);

        const alert = await this.alertCtrl.create({
            header: event.title,
            subHeader: event.desc,
            message: 'From: ' + start + '<br><br>To: ' + end,
            buttons: ['OK']
        });
        alert.present();
    }

    // Time slot was clicked
    onTimeSelected(ev) {
        const selected = new Date(ev.selectedTime);
        this.event.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.event.endTime = (selected.toISOString());
    }

    loadGoogleEvents() {
        // let valueStart = 1546333200;
        const daterStart = 1546333200;

        const start = new Date(daterStart);
        const end = new Date();
        end.setDate(end.getDate() + 31);

        this.androidCalendar.listEventsInRange(start, end)
            .then((data) => {
                data.map((value, key) => {
                    const eventCopy = {
                        title: value.title,
                        startTime: new Date(value.dtstart),
                        endTime: new Date(value.dtend),
                        allDay: this.event.allDay,
                        desc: this.event.desc
                    };
                    this.eventSource.push(eventCopy);
                    this.myCal.loadEvents();
                });
            });
    } // fim createRandomEvents
}
