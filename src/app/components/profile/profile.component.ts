import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private service: RestService, private router: Router) { }

  ngOnInit(): void {
    this.service.getProfile().subscribe(
      (data) => {
        this.user = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
        return false;
      }, () => {
        console.log('Completed.')
      }
    );
  }
}
