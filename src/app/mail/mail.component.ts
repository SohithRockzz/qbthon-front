import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../services/event.service';
import { Event, EventDetails } from '../services/eventinfo.model';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  event: EventDetails;

  constructor(private toastr: ToastrService, private eventService: EventService) { }

  ngOnInit(): void {
    this.event = this.eventService.getEvent();
  }

  sendReminderMail(){
    this.eventService.sendReminderMail(this.event.id).subscribe(data=>{
      this.toastr.success("Reminder Email sent Successfully");
    })
  }

  sendEducatorMail(){
    this.eventService.sendEducatorMail(this.event.id).subscribe(data=>{
      this.toastr.success("Educator Email sent Successfully");
    })
  }

}
