import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
@Injectable({
    providedIn: 'root'
})

export class PopupDialogService {
    constructor(private router: Router, private dialog: MatDialog) { }


}
