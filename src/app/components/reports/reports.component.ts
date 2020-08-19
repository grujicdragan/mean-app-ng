import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {
  date = new Date();
  day = this.date.getDate().toString();
  hours = this.date.getHours().toString();
  minutes = this.date.getMinutes().toString();
  weekday: string;
  month: string;
  username: any;
  t_str = this.hours + ':' + this.minutes;
  int1 = null;
  daysArray = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(private service: RestService, private router: Router) { }

  ngOnInit(): void {
    this.int1 = setInterval(this.updateTime, 60000);
    this.getWeekDay();
    this.getMonth();
    this.getName();
  }

  getName() {
    this.username = JSON.parse(localStorage.getItem('user'));
  }

  getWeekDay() {
    this.weekday = this.daysArray[this.date.getDay()];
  }

  getMonth() {
    this.month = this.monthArray[this.date.getMonth()];
  }

  updateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    if (minutes < 10) {
      this.minutes = '0' + minutes;
    } else {
      this.minutes = minutes.toString();
    }
    this.t_str = hours.toString() + ':' + this.minutes.toString() + ' ';
    document.getElementById('tre').innerHTML = this.t_str;
  }

  onLogout() {
    this.service.logout();
    this.router.navigate(['']);
  }


  ngOnDestroy(): void {
    clearInterval(this.int1);
  }

}
