import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  textError = '';
  textSuccess = '';
  res: any;

  constructor(
    private router: Router,
    private service: RestService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {}

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password,
    };

    if (!this.validationService.validateLogin(user)) {
      this.textError = 'Please fill all fields!';
      return false;
    }

    this.service.authenticateUser(user).subscribe(
      (data) => {
        this.res = data;
      },
      (err) => {
        this.textError = err;
      },
      () => {
        if (!this.res.success) {
          this.textError = this.res.msg;
        } else {
          this.textError = '';
          this.textSuccess = this.res.msg;
          this.service.storeUserData(this.res.token, this.res.user);
          setTimeout(() => {
            if (this.res.success) {
              this.router.navigate(['/timetracker']);
            }
          }, 2000);
        }
      }
    );
  }
}
