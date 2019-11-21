import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {Calendar} from '@ionic-native/calendar/ngx';
import * as moment from 'moment';

@Component({
    selector: 'app-cal-details',
    templateUrl: './cal-details.page.html',
    styleUrls: ['./cal-details.page.scss'],
})
export class CalDetailsPage implements OnInit {

    events = [];
    calendars = [];
    agenda = {
        nome: '',
    };

    constructor(public navCtrl: NavController, private calendar: Calendar, private plt: Platform) {
    }

    ngOnInit() {
        if (this.plt.is('android')) {
            // this.nomeAgenda();
            this.agendaTeste();
        }
        // this.agendaTeste();
    }

    nomeAgenda() {
        this.plt.ready().then(() => {
            this.calendar.listCalendars().then(data => {
                data.map((value) => {
                    this.agenda = {
                        nome: value.name
                    };
                });
            });
        });
    }

    agendaTeste() {
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 31);

        this.calendar.listEventsInRange(start, end).then(data => {
            data.map((value) => {
                value.dtstart = moment(value.dtstart).format('DD/MM/YYYY HH:mm');
                value.dtend = moment(value.dtend).format('DD/MM/YYYY HH:mm');
                this.events.push(value);
                console.log(this.events);
            });
        });
    }

}
