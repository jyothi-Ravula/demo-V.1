import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Base } from '@/businessclasses/base/base';
import {Constants} from '../../app.constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  uri =  Constants.HOST_URL;

  constructor(private http: HttpClient) { }

  getBaseData(): Observable<any> { 
    return this.http.get<any>(this.uri + '/Base/GetBaseData/');
  }
  // To create new Sample.
createComponents(ComponentNames): Observable<any> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<any>(this.uri + '/Base/CreateComponents/', ComponentNames, httpOptions);  
}
}
