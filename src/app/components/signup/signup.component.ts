import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Output() signUpCancel = new EventEmitter<boolean>();
  model: any = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  cancel() {
    this.signUpCancel.emit(false);
  }

  signUp() {
    this.authService.signUp(this.model)
      .subscribe(response => {
        console.log('created');
      }, error => {
        console.log(error.message);
      });
  }

}
