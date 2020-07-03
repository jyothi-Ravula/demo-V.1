import { Component, OnInit ,ViewChild, ViewChildren,ElementRef} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorMatcher } from '@/shared/errorMatcher';

//angular material components.
import { MatSort, MatTableDataSource, MatPaginator, MatRadioButton, MatRadioGroup, ErrorStateMatcher } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";

//import { DashboardComponent } from '@/businesscomponents/dashboard/dashboard.component';
import { Sample } from '../../businessclasses/sample/sample';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { PopupMessageService } from '../../shared/popup-message.service';
import { MessageConstants } from '../../shared/message-constants';
import { PhotoComponent } from '../photo/photo.component';
import { SampleService } from '../../businessservices/sample/sample.service';
//import { EmployeeService } from '@/businessservices/admin/employee.service';
//import { Employee } from '@/businessclasses/admin/employee';
import {map, startWith} from 'rxjs/operators';
//import { SampleService } from '../../../businessservices/sample.service';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  //variable declarations
    sampleForm : FormGroup;
    isChangesExists: boolean = false;
    errorMatcher = new ErrorMatcher();
    imageContent :string;
   //table declarations.	
    tableColumns: string[] = ['employeeName','notes','image','delete'];
    dummyData : Sample[]=[];
    dataSource = new MatTableDataSource<Sample>();
    highlightedRows = [];
    IdToUpdate = null;
    isTableHasData = true;
    noDataFound = MessageConstants.NODATAFOUNDMESSAGE;
    searchText : string;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('empName') empName: ElementRef;
    sampleData: Observable<Sample[]>;
    //file related variables.
    fileName : string;
    fileType : string;
    fileContent : string = "";
    myImage : string;
    employees: Observable<any[]> 
    employeeList : any[];  
    users: any[] = [
      { id: 1, firstname: 'John'   },
			{ id: 2, firstname: 'Kim cha'   },
			{ id: 3, firstname: 'Prasanth'  } ,
			{ id: 4, firstname: 'George' }
        ];
  constructor(
    private formbulider: FormBuilder,
		private dialog: MatDialog,
    private popupService: PopupMessageService,
    private sampleSerive : SampleService,
    private errorService : ErrorHandlerService,
   // private employeeService:EmployeeService,
  ) { }

  ngOnInit() {
   
    this.sampleForm = this.formbulider.group({
      notes : [,[]],
      employeeName : [,[]]
    });

   // this.setFocus();
    this.loadData();
    this.loadEmployees();
  }
  loadEmployees(){
       this.employeeList = this.users;
       this.employees = this.sampleForm.controls['employeeName'].valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.firstname),
        map(firstname => firstname ? this._filter(firstname) : this.employeeList)
      );

    }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    console.log(this.employeeList,'employeeList')
    return this.employeeList.filter(option => option.firstname.toLowerCase().indexOf(filterValue) === 0 );
  }
  displayFn(user?: any): string | undefined {
    return user ? user.firstname : undefined;
  }
  loadData(){
    
    this.sampleSerive.getSampleData().subscribe(result =>{
      if(!result){return}
      this.dataSource.data = result;
     // this.myImage = this.dataSource.data[2].image;
      this.dummyData = result;
      console.log(result,'result');
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  // form hasError validation.
	public hasError = (controlName: string, errorName: string) => {
		return this.sampleForm.controls[controlName].hasError(errorName);
	}
  onFormSubmit() {
    const sampleObj = this.sampleForm.value;
     if(typeof(sampleObj.employeeName) == 'object'){
      sampleObj.employeeName = sampleObj.employeeName.firstname;
    }
     let tempObj=
    {
      "employeeName": sampleObj.employeeName,
      "notes" : sampleObj.notes,
      "image" : this.fileContent
    }

     if (this.IdToUpdate == null) {
      this.createSample(tempObj);
    }
    else {
      this.updateSample(tempObj);
    }
  }

  

  async createSample(tempObj: any){
   this.sampleSerive.createSample(tempObj).subscribe(res=>{
      this.saveDataMessage();
      this.loadData();
    },
    (error) => {
      console.log(error)
      this.errorService.handleError(error);
    });
}

async saveDataMessage(){
  await this.popupService.openAlertDialog(MessageConstants.SAVEMESSAGE, "Sample", "check_circle", false);  
    this.resetForm();
}

async updateSample(Obj : any){
  Obj.id = this.IdToUpdate;
  console.log(Obj,'updateObj')
		this.sampleSerive.updateSample(Obj).subscribe(res => {
			this.popupService.openAlertDialog(MessageConstants.UPDATEMESSAGE, " Sample", "check_circle", false);
			this.isChangesExists = false;
			this.loadData();
			//this.ResetChanges();
		},
			(error) => {
				this.errorService.handleError(error);
			});
}

  resetForm(){
    //this.sampleForm.reset();
    this.sampleForm.controls['notes'].setValue("");
    this.empName.nativeElement.value = "";
    //.sampleForm.controls['EmployeeName'].setValue("");
    this.IdToUpdate=null;
    this.fileContent = "";
    this.loadEmployees();
    Object.keys(this.sampleForm.controls).forEach(key => {
			this.sampleForm.controls[key].setErrors(null)
	});
	
  }

  async deleteSample(id: number){
    const user_response = await this.popupService.openConfirmDialog(MessageConstants.DELETECONFIRMMESSAGE, "help_outline", false);
		if (user_response === "ok") {
			this.sampleSerive.deleteSample(id).subscribe(() => {
				this.deleteFunctionality();
			},
				(error) => {
					this.errorService.handleError(error);
				});
		}

 }

 async deleteFunctionality() {
		await this.popupService.openAlertDialog(MessageConstants.DELETEMESSAGE, "Sample", "check_circle", false);
		this.loadData();
		this.resetForm();
	}


  selectRow(row :Sample){
    this.imageContent ="";
  this.highlightedRows.pop();
  this.highlightedRows.push(row);
  this.loadStatusDataToEdit(row);
}

loadStatusDataToEdit(row){
  this.fileContent = row.image;
  this.IdToUpdate = row.id;
  this.imageContent =row.image;
  console.log(row,'row')
  this.sampleForm.controls['employeeName'].setValue({firstname :row.employeeName});
  this.sampleForm.controls['notes'].setValue(row.notes);
}

setFocus(){
  setTimeout(() => {
    this.empName.nativeElement.setSelectionRange(this.empName.nativeElement.value.length, this.empName.nativeElement.value.length);
    this.empName.nativeElement.focus();
  }, 0);
}

	// form fields text changes.
	isChange() {
		this.isChangesExists = true;
	}
 
/* image captured from local device */
selectedFile(event){
  debugger
	var files = event.target.files;	
    if (files.length === 0)
    	return;
  var reader = new FileReader();
  this.fileType=files[0].type;
	this.fileName=files[0].name;
  reader.readAsDataURL(files[0]);
	let index = this.dummyData.findIndex(x=>x.id == this.IdToUpdate);
    reader.onload = (event:any)=> {
        this.fileContent = event.target.result;
		// if(index>-1){
		// 	this.dummyData[index].image=this.fileContent;
		// }

  }
}

/* image captured from local device ends */
captureImageFromCam(){
    const viewTemplateDialog = new MatDialogConfig();
		viewTemplateDialog.disableClose = true;
		viewTemplateDialog.autoFocus = true;
		viewTemplateDialog.width = "800px";
		viewTemplateDialog.height = "600px";
		viewTemplateDialog.data = {
			title: "Take Photo",
			//content : index>-1?this.dummydata[index].templateFile : this.fileContent
		};
		const dialogConfig = this.dialog.open(PhotoComponent, viewTemplateDialog);		
    dialogConfig.afterClosed().subscribe(capturedImage => {
      this.fileContent=capturedImage;
      //edit Mode 
      // if(this.IdToUpdate){
      //   this.updateSample(this.sampleForm.value);
      //  }else{
      //   this.createSample(this.sampleForm.value);
      //  }
    });
  }


  //=============================  WEB API GENERATION CODE ==============================//
  createWebApi()
  {
    //this.sampleSerive.getSampleData().subscribe(result =>{
    this.sampleSerive.generateWebApi().subscribe(result =>{
      if(!result){return}
      //this.dataSource.data = result;
     // this.myImage = this.dataSource.data[2].image;
      //this.dummyData = result;
      debugger
      console.log(result,'webapi');
      this.popupService.openAlertDialog(result, "Sample", "check_circle", false);
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }


  createController(){
    this.sampleSerive.generateController().subscribe(result =>{
      debugger
      if(!result){return}    
      debugger
      console.log(result,'Controller');
      this.popupService.openAlertDialog(result, "Sample", "check_circle", false);
    },
    (error) => {
      debugger
      this.errorService.handleError(error);
    })
  }

}
