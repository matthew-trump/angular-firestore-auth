import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (environment.production) {
            return this.authService.user
                .pipe(
                    take(1),
                    tap(user => { console.log("AUTH GUARD USER", user) }),
                    map(user => _.has(_.get(user, 'roles'), 'admin')),
                    tap(authorized => {
                        if (!authorized) {
                            console.log('route prevented!')
                            this.router.navigate(['/']);
                        }
                    })
                );
        } else {
            return true;
        }

    }
}