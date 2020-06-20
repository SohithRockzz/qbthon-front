import { Component, OnInit } from '@angular/core';
import { User, Event, EventDetails } from '../services/eventinfo.model';
import { EventService } from '../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  earlyBirds: User[] = [];
  evouchers: User[] = [];
  message: string;
  evouchersmessage: string;
  event: EventDetails;

  constructor(private eventService: EventService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.event = this.eventService.getEvent();
    this.getEarlyBirds();
    this.getEVouhersList();
  }

  getEarlyBirds(){
    this.eventService.getEarlyBirds(this.event.id).subscribe(data=>{
      this.earlyBirds = data;
      if(data.length===0){
        this.message = 'No Early Birds';
      }
    }),(err)=>{
      console.error(err);
      this.toaster.error("Error in fetching the Early Birds. Please try later");
    }
  }

  getEVouhersList(){
    this.eventService.getVoucherList(this.event.id).subscribe(data=>{
      this.evouchers = data;
      if(data.length===0){
        this.evouchersmessage = 'No Winners have been declared for E-Voucher';
      }
    }),(err)=>{
      console.error(err);
      this.toaster.error("Error in fetching the Winners of E-Voucher. Please try later");
    }
  }

}
