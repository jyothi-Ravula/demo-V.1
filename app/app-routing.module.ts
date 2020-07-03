import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';

import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { NotAuthorizeComponent } from './error-pages/not-authorize/not-authorize.component';

import { LoginComponent } from './login';
import { AuthGuard } from './_guards';

import { CanDeactivateGuard } from './_guards/can-deactivate.guard';
//Admin Screens.

import { RolescreenComponent } from './businesscomponents/admin/roles/roles.component';   
import { UserComponent } from './businesscomponents/admin/user/user.component';  
import { PratesComponent } from './businesscomponents/admin/prates/prates.component'; 
import { SampleComponent} from './businesscomponents/sample/sample.component';
import { BaseComponent } from './businesscomponents/base/base.component';
const routes: Routes = [
//Home Component.
{path:'home',component:HomeComponent,data: { bc: '' }, canActivate: [AuthGuard]},

//Admin Screens.

{path:'admin_users',component:UserComponent,data: { bc: 'Users' },canDeactivate: [CanDeactivateGuard]},
{path:'admin_roles',component:RolescreenComponent,data: { bc: 'Roles' },canDeactivate: [CanDeactivateGuard]},
{path:'admin_prates',component:PratesComponent,canDeactivate: [CanDeactivateGuard], data: { bc: 'Postage Rates'},},
{path:'dashboard',component:SampleComponent,data: { bc: 'Sample' }},
{path:'base',component:BaseComponent,data: { bc: 'Dynamic App' }},
{path: 'login', component: LoginComponent},
{path: 'SuperAdminLogin', component: LoginComponent}, // "SuperAdminLogin" constant needs to be modified if Path changed.

{path:'401',component:NotAuthorizeComponent,data: { bc: '-- Not Authorized --' },},
{path:'404',component:NotFoundComponent,data: { bc: '-- Navigation Error --' },},
{path: '500', component: ServerErrorComponent,data: { bc: '-- Server Error --' }, },

{path:'', redirectTo: '/home', pathMatch: 'full'},
{path: '**', redirectTo: '/404', pathMatch: 'full'},

];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)], // , useHash: true ], // Chandra
  exports: [RouterModule],
  declarations:[]
})
export class AppRoutingModule { }
