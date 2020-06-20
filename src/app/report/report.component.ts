import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { EventService } from '../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
 isCollapsed = true;
  eventList=[];
  constructor(private eventService: EventService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEvents();

   
  }

  appendChart(eventId,i){
console.log(eventId);

    this.eventService.getChartData(eventId).subscribe((res:any) => {
      console.log(res);
    let chart = new CanvasJS.Chart("chartContainer"+i, {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: "Event Specific Question Chart "
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: res.StatusCount['Accepted'], label: "Accepted" },
          { y: res.StatusCount['Partially Accepted'], label: "Partially Accepted" },
          { y: res.StatusCount['Rejected'], label: "Rejected" },
          { y: res.StatusCount['Under Review'], label: "Under Review" },
        ]
      }]
    });
      
    let chart2 = new CanvasJS.Chart("chartContainer2"+i, {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Questions Developed per skills"
      },
      data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "##0.00\"%\"",
        indexLabel: "{label} {y}",
        dataPoints: [
          {y: res.CategoryCount['Application'], label: "Application"},
          {y: res.CategoryCount['Comprehension'], label: "Comprehension"},
          {y: res.CategoryCount['Analysis'], label: "Analysis"}
        ]
      }]
    });
    chart.render();
    chart2.render();
  });
  }
  getEvents(){
    this.eventService.getEventsDetails().subscribe((res:any) => {
      console.log(res);
      this.eventList=res;


    
    }, err => {
      this.toastr.error(err.message);
    });
  }
}
