export class Constants {
  
   public static get HOST_URL(): string { return "http://192.168.43.226:4000"; };
   //public static get HOST_URL(): string { return "http://192.168.43.245:4000"; };
   
   public static SSO : boolean = false;
   public static ServerIp:string="http://192.168.43.226";
   //public static ServerIp:string="http://192.168.43.245";

   //#region SideNav Menus Constants -----[START]-----
   //Screen Names(main menus)  constants
   public static adminScreenName : string = "Admin Screens";
   
   //submenus for Admin Screen
   public static rolesSubmenu : string = "Roles";
   public static homeScreenName : string = "Home";
   public static usersSubmenu : string = "Users";
   public static PostageRatesSubmenu : string = "Postage Rates";
//#endregion SideNav Menus Constants -----[END]-----


}
