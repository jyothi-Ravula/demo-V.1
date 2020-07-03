import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  
  isDashboardExpanded = false;
  showDashboardMenu = false;
  isDashboardShowing = true;


  @Output() sidenavClose = new EventEmitter();
  @Output() sidenavCusColor = new EventEmitter();
  @Output() sidenavAdmColor = new EventEmitter();
  @Output() sidenavAppColor = new EventEmitter();
  @Output() sidenavInsColor = new EventEmitter();
  @Output() sidenavPosColor = new EventEmitter();
//  @Output() sidenavAppColor = new EventEmitter();
  defaultColor:string = '#256275'; //Default Color
  highlightColor:string =   '#31829b' /* '#7897a1'	 '#31829b' */;
  
  buttonDashboardColor = this.defaultColor;
  constructor() { 
  }
 
	ngOnInit() {
	  
	}
 
	public onSidenavClose = () => {
    this.sidenavClose.emit();

   this.buttonDashboardColor = this.defaultColor;
	//set the menu to initial state.
	this.isDashboardExpanded = false;
	this.showDashboardMenu = false;	
		}
	
		onSidenavDashboard(){
			//reinitialize the variables.
			this.showDashboardMenu = false;

			this.showDashboardMenu = !this.showDashboardMenu;
			this.isDashboardExpanded = !this.isDashboardExpanded;

			this.buttonDashboardColor = this.highlightColor 
		}


}

















//////////////////////////////////////////   SAMPLE CODE ///////////////////////////

// import { Component, OnInit, Output, EventEmitter, Input,AfterViewInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { RoleScreenService } from 'app/businessservices/admin/roles.service';
  
// import { AuthenticationService } from '@/_services';
// import { Constants } from '@/app.constants';
 

// @Component({
//   selector: 'app-sidenav-list',
//   templateUrl: './sidenav-list.component.html',
//   styleUrls: ['./sidenav-list.component.css']
// })
// export class SidenavListComponent implements OnInit,AfterViewInit {

//   public sidenav_menus : Array<any> =[] ;
//   public isSideNavflag : boolean = false;
//   public selectedMenuItem : number = 0;
//   defaultColor:string = '#256275'; //Menu Item default color
//   highlightColor:string = '#31829b'; //Menu Item highlight color
   
//   @Output() sidenavClose = new EventEmitter();
//   @Input() 
//        set isSideNavOnLoad(val :boolean){   
//          this.selectedMenuItem = 0;
//         let  isSideMenuLoadedflag = (JSON.parse(sessionStorage.getItem('isSideMenuLoaded'))!= undefined || JSON.parse(sessionStorage.getItem('isSideMenuLoaded'))!= null) ? true : false;
//         if(val || isSideMenuLoadedflag === false){
//                this.onSetDefaultMenu();              
//           }         
//         }
//       get isSideNavOnLoad():boolean{        
//         let  isSideMenuLoadedflag = (JSON.parse(sessionStorage.getItem('isSideMenuLoaded'))!= undefined || JSON.parse(sessionStorage.getItem('isSideMenuLoaded'))!= null) ? true : false;
//         return isSideMenuLoadedflag;
//       }

//   constructor(private roleService:RoleScreenService, private route: ActivatedRoute,private router: Router, private authenticationService: AuthenticationService) {    
      
//   }

//   ngOnInit() {
//     this.selectedMenuItem = 0;
//         if(sessionStorage.getItem('currentUser')!=null && this.isSideNavOnLoad){
//            this.onSetDefaultMenu();               
//          }
  
//   }
//   ngAfterViewInit() {
//     this.selectedMenuItem = 0;
    
//   }

//   //***************** SideNav Menu fuctionality ---[START]-------********//

//   async onSetDefaultMenu(){
  
//     let tempsidenavmenus : Array<any> = []; //local sidenavmenu array
//     let sidenavMenusPrototype: Array<any> =this.getSidenavMenusPrototype(); //Get Sidenav Menus with SubMenus Prototype
//     tempsidenavmenus.push({'id':1 ,'screenName':Constants.homeScreenName,'routerLink':'/home','icon':'home','isActive':true,'privilege':'','subMenus':[]});// Set sefault landing  screens as Home

    
//     let currentUser : any = JSON.parse(sessionStorage.getItem('currentUser')); 
//     if(currentUser != null && currentUser.rolePrivilegeslist.length > 0){ 
//          sidenavMenusPrototype.forEach((currenntitem , index )=> {                
//                        let mainindex : number = currentUser.rolePrivilegeslist.findIndex(function (item: any) {
//                          return item.screenName.toLowerCase().trim() === currenntitem.screenName.toLowerCase().trim();      
//                         });

//                           if(mainindex != -1 ){                                                
//                               let privileges : string = currentUser.rolePrivilegeslist[mainindex].privilege!= null ? currentUser.rolePrivilegeslist[mainindex].privilege : null; 
//                               sidenavMenusPrototype[index].privilege = privileges; 
//                                //set Active Main menus   
//                                sidenavMenusPrototype[index].isActive = true; 
                             
//                               //set Active Sub menus
//                               if(!(currenntitem.screenName.toLowerCase().trim() === Constants.adminScreenName.toLowerCase().trim())){ 
                             
//                               if(sidenavMenusPrototype[index].subMenus.length > 0) {
//                                 let tempSubmenus  = sidenavMenusPrototype[index].subMenus;
//                                 if(privileges != null && (privileges.search('R') !== -1 || privileges.search('U') !== -1 || privileges.search('I') !== -1)|| privileges.search('D') !== -1){                                            
                               
//                               }
//                              }
//                             }
//                               tempsidenavmenus.push(sidenavMenusPrototype[index]);                             
                            
//                            }
//                      });                                                                                                                
//      }
//      else{
//         //If user sessions out
//          this.logOut();   
//      }
     
//      this._getSortedSidenavMenus(tempsidenavmenus);  
 
//   }


//   private getSidenavMenusPrototype() : Array<any>  {
   
//     let  sidenavMenusPrototype : Array<any> = [ 
//              {'id':9 ,'screenName':Constants.adminScreenName,'routerLink':'','icon':'settings','isActive':false,'privilege':'',
//         'subMenus':[
//                      {'screenName':Constants.PostageRatesSubmenu,'routerLink':'/admin_prates','isActive':true,},
//                      {'screenName':Constants.rolesSubmenu,'routerLink':'/admin_roles','isActive':true,},
//                      {'screenName':Constants.usersSubmenu ,'routerLink':'/admin_users','isActive':true,},
//                   ],        
//         },
//       ];

//   return sidenavMenusPrototype;
// }

//   private logOut(){
//     this.authenticationService.logout();
//     localStorage.removeItem('isSideNavflag');
   
//     sessionStorage.removeItem('isSideMenuLoaded');
//     this.router.navigate(['/login']); 
    
//   }

//   public onSelectedMenuItem(id): void { 
//     this.selectedMenuItem = id;  
//  }
 
//  public onSidenavClose = (id:any) => {
  
//   localStorage.removeItem('homeData');
//    if(id===11){
//      localStorage.setItem("InPrintLocaton","Entered")
//    } 
  
//    this.selectedMenuItem = 0;
//    this.sidenavClose.emit();
   
//  }

//  private _getSortedSidenavMenus(tempsidenavmenus:Array<any>) {
//   this.sidenav_menus=[];
//   tempsidenavmenus.sort((a,b) => (a.screenName > b.screenName) ? 1 : ((b.screenName > a.screenName) ? -1 : 0)); 
//   this.sidenav_menus = tempsidenavmenus;
// }

// //*****************SideNav Menu fuctionality ---[END]--------********//
 
// }
