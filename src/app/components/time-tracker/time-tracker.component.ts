import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.sass'],
})
export class TimeTrackerComponent implements OnInit {
  @Input() res: any;
  date = new Date();
  day = this.date.getDate().toString();
  hours = this.date.getHours().toString();
  minutes = this.date.getMinutes().toString();
  weekday: string;
  month: string;
  username: any;
  tStr = this.hours + ':' + this.minutes;
  cStr = '00:00:00';
  clockSeconds = 0;
  clockMinutes = 0;
  clockHours = 0;
  btnText = 'CLOCK IN';
  startStopText = 'start'
  interval = false;
  int = null;
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
    // this.service.setIdentifyFromStorage();
    // this.service.getTime().subscribe(
    //   (data) => {
    //     this.res = data;
    //   },
    //   (err) => console.log(err),
    //   () => {
    //     if (this.res) {
    //       const lastStartedTime = new Date(this.res.start);
    //       this.clockSeconds = lastStartedTime.getSeconds();
    //       this.clockMinutes = lastStartedTime.getMinutes();
    //       this.clockHours = lastStartedTime.getHours();
    //       this.TimeCounter();
    //       this.onTimeCounter(false);
    //     }
    //   }
    // );
  }

  onLogout() {
    this.service.logout();
    this.router.navigate(['']);
  }

  getName() {
    this.username = JSON.parse(localStorage.getItem('user'));
  }

  TimeCounter() {
    let displaySeconds = '';
    let displayMinutes = '';
    let displayHours = '';

    this.clockSeconds++;

    if (this.clockSeconds / 60 === 1) {
      this.clockSeconds = 0;
      this.clockMinutes++;

      if (this.clockMinutes / 60 === 1) {
        this.clockMinutes = 0;
        this.clockHours++;
      }
    }

    if (this.clockSeconds < 10) {
      displaySeconds = '0' + this.clockSeconds;
    } else {
      displaySeconds = this.clockSeconds.toString();
    }

    if (this.clockMinutes < 10) {
      displayMinutes = '0' + this.clockMinutes;
    } else {
      displayMinutes = this.clockMinutes.toString();
    }

    if (this.clockHours < 10) {
      displayHours = '0' + this.clockHours;
    } else {
      displayHours = this.clockHours.toString();
    }

    this.cStr = displayHours + ':' + displayMinutes + ':' + displaySeconds;
    document.getElementById('clock').innerHTML = this.cStr;
  }

  onTimeCounter() {
    this.interval = !this.interval;

    const x = document.getElementsByClassName('btnStartStop')[0];
    const y = document.getElementsByClassName('clickText1')[0];

    x.classList.toggle('active');
    y.classList.toggle('active');

    if (this.interval) {
      this.btnText = 'CLOCK OUT';
      this.startStopText = 'stop'
      this.interval = false;
      this.int = setInterval(() => {
        this.TimeCounter();
      }, 1000);
      return (this.interval = !this.interval);
    } else {
      this.btnText = 'CLOCK IN';
      this.startStopText = 'start'
      clearInterval(this.int);
    }
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
    if (hours < 10) {
      this.hours = '0' + hours;
    } else {
      this.hours = hours.toString();
    }
    this.tStr = this.hours.toString() + ':' + this.minutes.toString() + ' ';
    document.getElementById('tre').innerHTML = this.tStr;
  }

  ngOnDestroy(): void {
    clearInterval(this.int1);
  }

  // onTimeCounter(callApi = true) {
  //   this.interval = !this.interval;

  //   const x = document.getElementsByClassName('btnStartStop')[0];
  //   const y = document.getElementsByClassName('clickText1')[0];

  //   x.classList.toggle('active');
  //   y.classList.toggle('active');

  //   if (this.interval) {
  //     if (callApi) {
  //       this.service.startClocking().subscribe(
  //         (data) => {
  //           this.res = data;
  //         },
  //         (err) => console.log(err),
  //         () => {
  //           if (!this.res.success) {
  //             console.log(this.res.msg);
  //           } else {
  //             this.clockOut();
  //           }
  //         }
  //       );
  //     } else {
  //       this.clockOut();
  //     }
  //   } else {
  //     if (callApi) {
  //       this.service.stopClocking().subscribe(
  //         (data) => {
  //           this.res = data;
  //         },
  //         (err) => console.log(err),
  //         () => {
  //           if (!this.res.success) {
  //             console.log(this.res.msg);
  //           } else {
  //             this.clockIn();
  //           }
  //         }
  //       );
  //     } else {
  //       this.clockIn();
  //     }
  //   }
  // }

  // clockOut() {
  //   this.btnText = 'CLOCK OUT';
  //   this.startStopText = 'stop';
  //   this.interval = false;
  //   this.int = setInterval(() => {
  //     this.TimeCounter();
  //   }, 1000);
  //   this.interval = !this.interval;
  // }

  // clockIn() {
  //   this.btnText = 'CLOCK IN';
  //   this.startStopText = 'start';
  //   clearInterval(this.int);
  // }
}
