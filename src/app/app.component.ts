import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string;
  testMenu: boolean;

  user: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.user = this.authService.user;
  }
  ngOnInit() {

  }
  goToMenuChoice(choice) {
    this.router.navigate(['/'].concat(choice));
  }
}
