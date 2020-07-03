

// currently not used as of March 12 2019
// will be used in the tutorial based on http://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial
 

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '@/_services';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message1 => { 
            this.message = message1; 	
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}