import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { Event, User, EventDetails } from '../services/eventinfo.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeEventType: string;
  user: User = new User();  
  eventList: Event[] = [];
  eventDetailsList: EventDetails[] = [];
  filteredEventDetailsList: EventDetails[] = [];
  filteredEventList: EventDetails[] = [];
  selectedType: string;
  showRegisterTag:boolean=true;
  todaysDate= new Date();
  allEvents: EventDetails[] = [];

  constructor(private eventService: EventService,
     private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.activeEventType="TOTAL";
    this.user = this.eventService.getUser();
    this.selectedType = 'Active';
    this.getEventDetails();
    
  }
  compareTodaysDate(eventDate){
     var localDate = new Date(eventDate);
    if(localDate>=this.todaysDate){
      return true;
    }else{
      return false;
    }
  }
  getEventDetails(){
    if(this.user){
      if(this.user.adminFlag){
        this.eventService.getAllEvents().subscribe(data=>{
          this.eventList = data;
          this.getEventList(this.selectedType);
        }, err => {
          this.toastr.error(err.error);
        });
      }else{
          this.eventService.getEventsDetailsOfUser(this.user.id).subscribe(data => {
            this.eventDetailsList = data;
            this.checkNomination(this.eventDetailsList);
            this.getEventListForUser(this.selectedType);
          }, err => {
            this.toastr.error(err.error);
          });
        }
    }
  }

  checkNomination(list:EventDetails[]){
    console.log(list);
    this.allEvents.push(list['TOTAL']);
    list['TOTAL'].some(event=>{
      if(event.nomination){
        this.eventService.setNomination(true);
        this.eventService.setId(event.id);
      }
    })
  }

  getEventListForUser(type: string){
    if(type==='Active'){
      this.selectedType = 'Active'
      this.filteredEventDetailsList = this.eventDetailsList['ACTIVE'];
      this.showRegisterTag=false;
    }else if(type==='Upcoming'){
      this.selectedType = 'Upcoming'
      this.filteredEventDetailsList = this.eventDetailsList['UPCOMING'];
      if (this.eventDetailsList['UPCOMING'].some(e => e.role === 'SME') && this.eventDetailsList['UPCOMING'].some(e => e.role === 'USER')) {
        this.showRegisterTag=true;
      }else if(this.eventDetailsList['UPCOMING'].some(e => e.role === 'SME') && !this.eventDetailsList['UPCOMING'].some(e => e.role === 'USER')){
        this.showRegisterTag=false;
      }else{
        this.showRegisterTag=true;
      }
    }else if(type==='Completed'){
      this.selectedType = 'Completed'
      this.filteredEventDetailsList = this.eventDetailsList['COMPLETED'];
      if (this.eventDetailsList['COMPLETED'].some(e => e.role === 'SME')) {
        this.showRegisterTag=true;
      }else{
        this.showRegisterTag=false;
      }
    }else if(type==='All'){
      this.selectedType = 'All'
      this.filteredEventDetailsList = this.eventDetailsList['TOTAL'];
      if (this.eventDetailsList['TOTAL'].some(e => e.role === 'SME') && this.eventDetailsList['TOTAL'].some(e => e.role === 'USER')) {
        this.showRegisterTag=true;
      }else if(this.eventDetailsList['TOTAL'].some(e => e.role === 'SME') && !this.eventDetailsList['TOTAL'].some(e => e.role === 'USER')){
        this.showRegisterTag=false;
      }else{
        this.showRegisterTag=true;
      }
    }
  }
  
  getEventList(type:string){
    if(type==='Active'){
      this.selectedType = 'Active'
      this.filteredEventList = this.eventList['ACTIVE'];
    }else if(type==='Upcoming'){
      this.selectedType = 'Upcoming'
      this.filteredEventList = this.eventList['UPCOMING'];
    }else if(type==='Completed'){
      this.selectedType = 'Completed'
      this.filteredEventList = this.eventList['COMPLETED'];
    }else if(type==='All'){
      this.selectedType = 'All'
      this.filteredEventList = this.eventList['TOTAL']
    }
    console.log(this.filteredEventList);
  }
  
  getNominated(eventId){
    this.eventService.getNominated(this.user.id,eventId).subscribe(data => {
      this.toastr.success("Nominated Successfully");
      this.getEventDetails();
      this.getEventList(this.selectedType);
    }, err => {
      this.toastr.error(err.error);
    });
  }

  editEvent(event:EventDetails){
    if(event.nomination||this.user.adminFlag||event.role==='SME'){
      console.log(event);
      this.eventService.setEvent(event);
      this.router.navigate(['/edit']);
      if(this.user.adminFlag){
        this.eventService.setSelectedTab('mail');
      }else{
        this.eventService.setSelectedTab('createquestion');
      }
    }else{
      this.toastr.error('Please Nominate to Participate');
    }
    
  }
}
