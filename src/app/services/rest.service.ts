import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://mean-application.herokuapp.com/users/register', user, {
      headers: headers,
    });
  }

  getProfile(): any {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.get('https://mean-application.herokuapp.com/users/profile', { headers: headers })
  }

  authenticateUser(user: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://mean-application.herokuapp.com/users/authenticate', user, {
      headers: headers,
    });
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // setIdentifyFromStorage() {
  //   const token = localStorage.getItem('id_token');
  //   const user = localStorage.getItem('user');
  //   if (!token || !user) {
  //     localStorage.removeItem('id_token');
  //     localStorage.removeItem('user');
  //     return location.href = '/login';
  //   }
  //   this.authToken = token;
  //   this.user = JSON.parse(user);
  // }

  // getReports() {
  //   this.loadToken();
  //   const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
  //   return this.http.get('http://localhost:3000/times/all', { headers });
  // }

  // getTime() {
  //   this.loadToken();
  //   const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
  //   return this.http.get('http://localhost:3000/times/lastTime', { headers });
  // }

  // startClocking() {
  //   this.loadToken();
  //   const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/times/start', {}, { headers });
  // }

  // stopClocking() {
  //   this.loadToken();
  //   const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
  //   return this.http.put('http://localhost:3000/times/stop', {}, { headers });
  // }
}
