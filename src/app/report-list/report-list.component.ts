import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  Report: any = [];
  constructor(public restApi: RestApiService
    ) { }

  ngOnInit() {
    this.loadEmployees();
  }
  loadEmployees() {
    return this.restApi.getReport().subscribe((data: {}) => {
      this.Report = data;
      console.log("wrong data:"+data);
    })
}
}
