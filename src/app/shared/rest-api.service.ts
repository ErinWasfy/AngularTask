import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReportData } from '../shared/report-data';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ReportState } from '../../interfaces/report-state.interface';
import { ReportSpamTeamState } from './report-spamstate';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  // Define API
  apiURL = 'http://localhost:3000';
  apiStateURL='http://localhost:3001';
  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch employees list
  getReport(): Observable<ReportData> {
    return this.http.get<ReportData>(this.apiURL + '/elements')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getState(): Observable<ReportSpamTeamState> {
    return this.http.get<ReportSpamTeamState>(this.apiStateURL+'/state' )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
    
  }

  // HttpClient API get() method => Fetch employee
  getReportId(id): Observable<ReportData> {
    return this.http.get<ReportData>(this.apiURL + '/elements/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

 
  // HttpClient API put() method => Update employee
  updateReport(id,reportdata): Observable<ReportData> {
    return this.http.put<ReportData>(this.apiURL + '/elements/' + id, JSON.stringify(reportdata), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
   // Error handling 
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
