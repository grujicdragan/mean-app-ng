import { Component, OnInit, Output } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  password: String;
  messageText = '';
  messageTextError = '';
  @Output() res: any;

  constructor(
    private validationService: ValidationService,
    private service: RestService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    if (!this.validationService.validateRegister(user)) {
      this.messageTextError = 'Please fill all fields!';
      return false;
    }

    if (!this.validationService.validateEmail(user.email)) {
      this.messageTextError = 'Please enter a valid email!';
      return false;
    }

    this.service.registerUser(user).subscribe(
      (data) => {
        this.res = data;
      },
      (err) => {
        this.messageTextError = 'Whoops, something went wrong.';
      },
      () => {
        this.messageTextError = '';
        this.messageText = 'You are now registered and can log in.';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      }
    );
  }
}
