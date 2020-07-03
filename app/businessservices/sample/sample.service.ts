import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sample } from '@/businessclasses/sample/sample';
import {Constants} from '../../app.constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  // uri = 'http://localhost:4000';
  uri =  Constants.HOST_URL;

  constructor(private http: HttpClient) { }
//get sample data
  getSampleData(): Observable<any> { 
    debugger
    return this.http.get<any>(this.uri + '/Sample/GetSampleData/');
  }
  
// To create new Sample.
createSample(SampleObj: Sample): Observable<Sample> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Sample>(this.uri + '/Sample/AddSampleData/', SampleObj, httpOptions);  
}

updateSample(SampleObj: Sample): Observable<Sample> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Sample>(this.uri + '/Sample/UpdateSampleData/', SampleObj, httpOptions); 
  }  
  deleteSample(id: number): Observable<any> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<any>(this.uri + '/Sample/DeleteSampleData/' + id, httpOptions);  
  } 

  generateWebApi():Observable<any>{
    return this.http.get<any>(this.uri + '/Sample/CreateWEBAPI');        
  }
  generateController():Observable<string>{ 
    return this.http.get<string>(this.uri + '/Sample/CreateController');
  }


}