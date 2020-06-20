import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { EventService } from '../services/event.service';
import { Event, User, EventDetails } from '../services/eventinfo.model';
import { StatusComponent } from '../status/status.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventheader',
  templateUrl: './eventheader.component.html',
  styleUrls: ['./eventheader.component.scss']
})
export class EventheaderComponent implements OnInit {

  @ViewChild('caseTabs') caseTabs: TabsetComponent;
  @ViewChild('adminCaseTabs') adminCaseTabs: TabsetComponent;
  event: EventDetails;
  isStatusSelected: boolean;
  @ViewChild('statusComponent') statusComponent: StatusComponent;
  user: User = new User();

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.populateEventDetails();
    this.user = this.eventService.getUser();
  }
  
  ngAfterViewInit() {
    if (!this.user.adminFlag) {
      this.selectedTabValue;
    } else {
      this.selectedTabValueForUser;
    }
  }
  
  // setTimer() {
  //   var endTime;
  //   var startTime;
  //   if(this.event.slot==='noon'){
  //     startTime  = this.event.date.toString()+"2:00:00";
  //     endTime = new Date().toString()+"6:00:00";
  //   }else{
  //     startTime  = this.event.date.toString()+"9:00:00";
  //     endTime = new Date().toString()+"1:00:00";
  //   }
  //   var countDownDate = new Date(startTime).getTime();
  //   var x = setInterval(function () {
  //     var now = new Date(endTime).getTime();
  //     var distance = countDownDate - now;
  //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
  //     document.getElementById("demo").innerHTML =  hours + "h "
  //     + minutes + "m " + seconds + "s ";
  //     console.log(hours);
  //     console.log(minutes);
  //     console.log(seconds);
      
  //     if (distance < 0) {
  //       clearInterval(x);
  //       document.getElementById("demo").innerHTML = "EXPIRED";
  //     }
  //   }, 1000);
  // }
  
  get selectedTabValue() {
    if (this.eventService.getSelectedTab()) {
      if (this.eventService.getSelectedTab() === 'mail') {
        if (this.adminCaseTabs) {
          this.adminCaseTabs.tabs[0].active = true;
        }
        this.eventService.setSelectedTab('');
      } else if (this.eventService.getSelectedTab() === 'viewquestions') {
        if (this.adminCaseTabs) {
          this.adminCaseTabs.tabs[1].active = true;
        }
        this.eventService.setSelectedTab('');
      } else {
        this.eventService.setSelectedTab('');
      }
    }
    return true;
  }

  get selectedTabValueForUser() {
    if (this.eventService.getSelectedTab()) {
      if (this.eventService.getSelectedTab() === 'createquestion') {
        if (this.caseTabs) {
          this.caseTabs.tabs[0].active = true;
        }
        this.eventService.setSelectedTab('');
      } else if (this.eventService.getSelectedTab() === 'viewstatus') {
        if (this.caseTabs) {
          this.caseTabs.tabs[1].active = true;
        }
        this.eventService.setSelectedTab('');
      } else if (this.eventService.getSelectedTab() === 'leaderboard') {
        if (this.caseTabs) {
          this.caseTabs.tabs[2].active = true;
        }
        this.eventService.setSelectedTab('');
      } else {
        this.eventService.setSelectedTab('');
      }
    }
    return true;
  }

  populateEventDetails() {
    this.event = this.eventService.getEvent();
    //this.setTimer();
    if (!this.event) {
      this.router.navigate(['/home']);
    }
  }

  refreshData() {
    console.log("Refreshing data::::");
    if (this.statusComponent) {
      if (this.user.adminFlag) {
        this.statusComponent.getQuestionsMapList();
      } else {
        this.statusComponent.getUserQuestionsList();
      }
    }
  }

}
