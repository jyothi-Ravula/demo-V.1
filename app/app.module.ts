import { BrowserModule } from '@angular/platform-browser';  
import { NgModule } from '@angular/core';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';  
import { MatButtonModule, MatMenuModule, MatDatepickerModule,MatNativeDateModule , MatIconModule, MatCardModule, MatSidenavModule,MatFormFieldModule,  
  MatInputModule, MatTooltipModule, MatToolbarModule, MatTableModule, MatSortModule,MatPaginatorModule,MatTabsModule,MatListModule,
  MatProgressBarModule, MatProgressSpinnerModule,MatCheckboxModule,MatSelectModule,MatExpansionModule
} from '@angular/material';  

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';   
import { AppRoutingModule } from './app-routing.module';  
import { LayoutComponent } from './layout/layout.component';
import {MatDialogModule} from "@angular/material";
import { HashLocationStrategy, LocationStrategy,DatePipe,DecimalPipe } from '@angular/common'; // chandra
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { BreadcrumbComponent } from './navigation/breadcrumb/breadcrumb.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { TextMaskModule } from 'angular2-text-mask';   
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AppComponent } from './app.component';  
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { ConfirmDialogComponent } from './commoncomponents/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './commoncomponents/alert-dialog/alert-dialog.component';
import { AlertComponent } from '@/_components'; 
import { JwtInterceptor, ErrorInterceptor } from '@/_helpers';
import { LoginComponent } from '@/login';

//Custom component.
import {AllowNumericsDirective} from './shared/allow-numerics.directive';

//Admin Screen Components.
import { RolescreenComponent } from './businesscomponents/admin/roles/roles.component'; 
import { UserComponent } from './businesscomponents/admin/user/user.component';  
import { RolesDialogComponent } from './businesscomponents/admin/user/roles-dialog/roles-dialog.component';  
import { PratesComponent } from './businesscomponents/admin/prates/prates.component'; 
//HomeComponent.
import { HomeComponent } from './home/home.component';



import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FooterComponent } from './navigation/footer/footer.component';
import { BrowserOptionsComponent } from './browser-options/browser-options.component';
import { NotAuthorizeComponent } from './error-pages/not-authorize/not-authorize.component';


//Can Deactivate Guard.
import{CanDeactivateGuard} from '../app/_guards/can-deactivate.guard';
import {MatTreeModule} from '@angular/material/tree';


import { SampleComponent} from './businesscomponents/sample/sample.component';
import { PhotoComponent} from './businesscomponents/photo/photo.component';
import { BaseComponent } from './businesscomponents/base/base.component';
@NgModule({  
  declarations: [  
    AppComponent,  
    LayoutComponent, HomeComponent, HeaderComponent, 
	SidenavListComponent, BreadcrumbComponent, NotFoundComponent, 
	ServerErrorComponent, AlertDialogComponent, ConfirmDialogComponent,
	LoginComponent,
	AlertComponent, 

	UserComponent,
  RolescreenComponent,
  RolesDialogComponent,
  AllowNumericsDirective,
  FooterComponent,
  BrowserOptionsComponent,
  NotAuthorizeComponent,
  PratesComponent,
  SampleComponent,
  PhotoComponent,
  BaseComponent
	],  
    	
  imports: [  
    BrowserModule,  
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule,  
    BrowserAnimationsModule,  
    MatButtonModule,  
    MatMenuModule,  
    MatDatepickerModule,  
    MatNativeDateModule,  
    MatIconModule,  
    MatRadioModule,  
    MatCardModule,  
    MatSidenavModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatTooltipModule,  
    MatToolbarModule,  
    AppRoutingModule,
	MatTableModule,
	MatSortModule,
	FlexLayoutModule,
	MatPaginatorModule,
	MatTabsModule,
	MatListModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatCheckboxModule,
	MatDialogModule,
	MatSelectModule,
  MatAutocompleteModule,
  MatExpansionModule,
  TextMaskModule,
  NgxExtendedPdfViewerModule,
  MatTreeModule

  ],  
  providers: [
    HttpClientModule, 
    CanDeactivateGuard,
	
		MatDatepickerModule,
		// the below interceptors MAY?? make the real pages fail... Comment them once back end is ready
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
 
    {provide: LocationStrategy, useClass: HashLocationStrategy},  // Chandra
 
		HeaderComponent,
		
		{ provide: MatDialogRef, useValue: {} },
		{ provide: MAT_DIALOG_DATA, useValue: [] },DatePipe,DecimalPipe
    ],
  
  bootstrap: [AppComponent],
  entryComponents: [AlertDialogComponent,ConfirmDialogComponent, 
    RolesDialogComponent,PhotoComponent,
    BrowserOptionsComponent
  ] 
})  
export class AppModule { }  
