import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { Event, User } from '../services/eventinfo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventCreationForm: FormGroup;
  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;
  submitted: boolean;
  isSecOption: boolean;
  today: Date;
  files: any[] = [];
  assocFiles: any[] = [];
  event: Event = new Event();
  skills: string[];
  smeFileName: string;
  associatesFileName: string;
  user: User = new User();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private eventService: EventService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.eventCreationForm = this.formBuilder.group({
      date: ['', Validators.required],
      slot: ['', Validators.required],
      skill: ['', Validators.required]
    })
    this.today = new Date();
  }

  get date() {
    return this.eventCreationForm.get('date');
  }

  get slot() {
    return this.eventCreationForm.get('slot');
  }

  get skill() {
    return this.eventCreationForm.get('skill');
  }

  uploadSME(event) {
    for (let index = 0; index < event.target.files.length; index++) {
      this.files.push(event.target.files[index]);
      this.smeFileName = this.files[0].name;
    }
    console.log(this.files);
  }

  createEvent() {
    this.submitted = true;
    if (this.eventCreationForm.invalid) {
      return;
    }
    if (this.files.length > 0) {
      const data = new FormData();
      data.append('smeFile', this.files[0]);
      data.append('assocFile', this.assocFiles[0]);
      this.event.date = this.date.value;
      this.event.skills = this.skill.value.toString();
      this.event.slot = this.slot.value;
      data.append('event',JSON.stringify(this.event));
      console.log(this.event);
      this.eventService.createEvent(data).subscribe(res => {
        this.toastr.success("Event Created Successfully");
        this.router.navigate(['/home']);
        this.cancel();
      }, err => {
        console.log(err);
        this.toastr.error(err.error);
        this.files = [];
      });
      this.user = this.eventService.getUser();
    } else {
      this.toastr.error('Please select files to upload');
    }
  }

  uploadAssociates(event) {
    for (let index = 0; index < event.target.files.length; index++) {
      this.assocFiles.push(event.target.files[index]);
      this.associatesFileName = this.assocFiles[0].name;
    }
    console.log(this.assocFiles);
  }


  cancel() {
    this.submitted = false;
    this.eventCreationForm.reset();
    this.slot.setValue('');
    this.date.setValue('');
    this.skill.setValue('');
    this.assocFiles = [];
    this.files = [];
    this.smeFileName = '';
    this.associatesFileName = '';

  }

}
