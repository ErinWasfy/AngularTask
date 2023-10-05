import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportState } from 'src/interfaces';
import reportsData from '../data/reports.json';
import { ReportData } from './shared/report-data';
import { ReportSpamTeamState } from './shared/report-spamstate';
import { RestApiService } from './shared/rest-api.service';

interface Report 
{
  id:String;
  source:String;
  sourceIdentityId:String;
  reportType:String;
  state:String;
  message:String;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private reportServiceSubscription: Subscription;
  private stateServiceSubscription:Subscription;
  private updateReportSubscription:Subscription;
  reportData:ReportData;
  id = this.actRoute.snapshot.params['id'];
  selectedData:any="";
  reportState:ReportState;
  title = 'Spam Protection Page -AAIB';
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ){}

  ngOnInit() { 
    this.loadReportData()
    
   
  }
  loadReportData() {
   this.reportServiceSubscription= this.restApi.getReport().subscribe(data => {
      this.reportData = data;
    })
    return this.reportServiceSubscription;
  }

  changeToBlockState(iD:any)
  {
    if(this.reportData[iD].state!="closed")
    {
   this.stateServiceSubscription= this.restApi.getState().subscribe(data=>{
     this.reportState=data;
      console.log("state: "+this.reportState);
     this.reportData[iD].state=this.reportState;
     console.log("New State: "+this.reportData[iD].state);
    console.log('Test: '+this.reportData[iD].id);
    this.updateReportSubscription=this.restApi.updateReport(this.reportData[iD].id,this.reportData[iD]).subscribe((data:{})=>{
      this.selectedData=data;
    })
  }); 
  }
  else 
  {
    alert("this data has already been closed So check another one");
  }
    /*this.restApi.getState().subscribe((data:{})=>{
      this.reportState=data;
     }); */
     
  }
  resolveSpam(id:number)
  {
    this.reportData[id].state="Resolved";
   this.updateReportSubscription= this.restApi.updateReport(this.reportData[id].id,this.reportData[id]).subscribe((data:{})=>{
      this.selectedData=data;
    })

  }
  ngOnDestory()
  {
   this.reportServiceSubscription.unsubscribe();
   this.stateServiceSubscription.unsubscribe();
   this.updateReportSubscription.unsubscribe();
  }

}
