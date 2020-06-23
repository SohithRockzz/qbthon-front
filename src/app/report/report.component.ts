import { Component, OnInit, ViewChild } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { EventService } from '../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroupDirective, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  isCollapsed = false;
  eventList = [] = [];
  filterEventList = [];
  submitted: boolean;
  reportForm: FormGroup;
  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  constructor(private eventService: EventService, private datePipe: DatePipe,
    private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log("Inside report ngONinti");
    this.reportForm = this.formBuilder.group({
      date: ['', Validators.required],
    })
    this.getEvents();
  }
  get date() {
    return this.reportForm.get('date');
  }

  findEvents() {
    if (!this.date.value) {
      this.toastr.error('Date is a required Field');
    }
    console.log(this.eventList);
    this.filterEventList = this.filterEvents(this.date.value);
    if (this.filterEventList.length === 0) {
      this.toastr.error("No Events are found");
    }
  }

  filterEvents(date): any[] {
    this.getEvents();
    return this.eventList.filter(event => {
      return event.date.includes(date)
    });
  }

  appendChart(eventId, i) {
    this.eventService.getChartData(eventId).subscribe((res: any) => {
      console.log(res);
      let chart = new CanvasJS.Chart("chartContainer" + i, {
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
      let chart2 = new CanvasJS.Chart("chartContainer2" + i, {
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
            { y: res.CategoryCount['Application'], label: "Application" },
            { y: res.CategoryCount['Comprehension'], label: "Comprehension" },
            { y: res.CategoryCount['Analysis'], label: "Analysis" }
          ]
        }]
      });
      chart.render();
      chart2.render();
    });
  }
  getEvents() {
    this.eventService.getEventsDetails().subscribe((res: any) => {
      this.eventList = res;
      this.formatDate(this.eventList)
    }, err => {
      this.toastr.error(err.message);
    });
  }
  formatDate(list) {
    list.forEach(event => {
      event.date = this.datePipe.transform(event.date, "yyyy-MM-dd");
    })
  }
}
