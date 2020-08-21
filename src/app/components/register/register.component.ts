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
  textLoading = '';
  res: any;

  constructor(
    private validationService: ValidationService,
    private service: RestService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onRegisterSubmit() {
    this.messageTextError = '';
    this.textLoading = 'Loading, please wait...';
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    if (!this.validationService.validateRegister(user)) {
      this.textLoading = '';
      this.messageTextError = 'Please fill all fields!';
      return false;
    }

    if (!this.validationService.validateEmail(user.email)) {
      this.textLoading = '';
      this.messageTextError = 'Please enter a valid email format!';
      return false;
    }

    this.service.registerUser(user).subscribe(
      (data) => {
        this.res = data;
      },
      (err) => {
        this.textLoading = '';
        this.messageTextError = err;
      },
      () => {
        if (!this.res.success) {
          this.textLoading = '';
          this.messageTextError = this.res.msg;
        } else {
          this.messageTextError = '';
          this.textLoading = '';
          this.messageText = this.res.msg;
          this.service.storeUserData(this.res.token, this.res.user);
          setTimeout(() => {
            if (this.res.success) {
              this.router.navigate(['/']);
            }
          }, 2000);
        }
      }
    );
  }
}
