import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  jwtHelperService = new JwtHelperService();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.authService.currentUser = user;
    }
  }
}
