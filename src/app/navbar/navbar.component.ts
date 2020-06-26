
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../services/eventinfo.model';
import { EventService } from '../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  activItem: string;
  user: User = new User();

  constructor(private router: Router, private eventService: EventService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = this.eventService.getUser();
    // if(!this.user){
    //   this.router.navigate(['\login']);
    // }
  }

  changeActiveItem(selection){
    this.activItem = selection;
    if(selection==='home'){
      this.router.navigate(['/home'])
    }else if(selection==='create'){
      this.router.navigate(['/create-event'])
    }else if(selection ==='practice'){
      if(this.eventService.getNomination()){
        this.router.navigate(['/practice']);
      }else{
        this.toastr.error('Please nominate in any event to practice');
      }
    }
    if(selection==='reports'){
      console.log("inside report");
      this.router.navigate(['/report'])
    }
  }

  logout(){
    this.eventService.setUser(null);
    this.eventService.setId(null);
    this.eventService.setEvent(null);
    this.eventService.setNomination(null);
    this.router.navigate(['/login']);
  }
}
