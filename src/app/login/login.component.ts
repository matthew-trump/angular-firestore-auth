import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Observable<User>;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  submitting: boolean = false;
  invalidCredentials: boolean = false;
  submitError: boolean = false;
  disableInputsWhileSubmitting: boolean = false;


  constructor(
    public authService: AuthService
  ) {
    this.user = authService.user;
  }

  ngOnInit() {
  }

  loginWithEmailAndPassword() {

    this.submitting = true;
    if (this.disableInputsWhileSubmitting) {
      this.email.disable();
      this.password.disable();
    }

    console.log(this.email.value, this.password.value);

    let $this = this;
    this.authService.getAuth().signInWithEmailAndPassword(this.email.value, this.password.value)
      .catch(function (error) {
        // Handle Errors here.
        $this.submitting = false;
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password' || errorCode === "auth/user-not-found") {
          $this.invalidCredentials = true;
        } else {
          $this.submitError = true;
        }
        console.log(error);
      })
      .then((credential) => {
        console.log("CREDENTIAL", credential);
        $this.submitting = false;
        this.authService.updateUser(credential);
      });
  }
  login() {
    this.authService.googleLogin();
  }
  logout() {
    this.authService.signOut();
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter an email' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a password' :
      this.password.hasError('minlength') ? 'Password is too short' :
        '';
  }
  formInvalid() {
    return this.email.invalid || this.password.invalid || this.invalidCredentials;
  }
  resetCredentials() {
    this.submitError = false;
    this.invalidCredentials = false;
  }
}
