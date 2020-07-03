import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Base } from '../../businessclasses/base/base';
import { BaseService } from '../../businessservices/base/base.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { PopupMessageService } from '../../shared/popup-message.service';
import { MessageConstants } from '@/shared/message-constants';
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  dataSource = new MatTableDataSource<Base>();
  tableColumns: string[] = ['tableName','select'];
  @ViewChild(MatSort) sort: MatSort;
  isTableHasData : boolean = false;
  highlightedRows  = [];
  spinnerText = "Generating Application Please Wait."
  hideSpinner= false;
  selection = new SelectionModel<Base>(true, []);
  constructor(private baseService: BaseService,
    private popupService: PopupMessageService,
    private errorService : ErrorHandlerService,) { }

  ngOnInit() {
    this.baseService.getBaseData().subscribe(result=>{
      console.log(result);
      this.dataSource.data= result
    });
    this.dataSource.data = [];
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  onFormSubmit(){
    let data=[];
    for(let i=0;i<this.selection.selected.length;i++){
        data.push(this.selection.selected[i].tableName);
    }
    if(data.length>0){
      this.hideSpinner=true;
      this.baseService.createComponents(data).subscribe((results)=>{
        this.hideSpinner=false;
        if(results!=null && results !=undefined){
         
          this.popupService.openAlertDialog(results.message, "Base", "check_circle", true);
         
        }
        else{
         
          this.popupService.openAlertDialog("Component(s) created successfully.", "Base", "check_circle", false);
        }
        
      }
      ,
      (error)=>{
        this.hideSpinner=false;
        this.errorService.handleError(error);
      })
    }
    else{
      this.popupService.openAlertDialog("Please select atleast one selection.", "Base", "check_circle", false);
    }
   
  }
}
