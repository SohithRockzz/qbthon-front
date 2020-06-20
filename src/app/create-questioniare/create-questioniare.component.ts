import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Questionnaire, Event, User, EventDetails } from '../services/eventinfo.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-questioniare',
  templateUrl: './create-questioniare.component.html',
  styleUrls: ['./create-questioniare.component.scss']
})
export class CreateQuestioniareComponent implements OnInit {

  questionCreationForm: FormGroup;
  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;
  submitted: boolean;
  isSecOption: boolean;
  questionnaire: Questionnaire = new Questionnaire();
  quesFiles: any[] = [];
  event: EventDetails;
  user: User = new User();
  stackList: string[] = []; 
  constructor(private formBuilder: FormBuilder, private router: Router, private eventService: EventService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.questionCreationForm = this.formBuilder.group({
      stack: ['', Validators.required],
      topic: ['', Validators.required],
      source: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      difficulty: ['', Validators.required],
      multiple: ['', Validators.required],
      option1: ['', Validators.required],
      score1: ['', Validators.required],
      option2: ['', Validators.required],
      score2: ['', Validators.required],
      option3: ['', Validators.required],
      score3: ['', Validators.required],
      option4: ['', Validators.required],
      score4: ['', Validators.required],
    });
    this.event=this.eventService.getEvent();
    this.user  = this.eventService.getUser();
    this.event.skills.split(",").forEach(stack=>{
      this.stackList.push(stack);
    });
  }

  get stack() {
    return this.questionCreationForm.get('stack');
  }

  get multiple() {
    return this.questionCreationForm.get('multiple');
  }

  get topic() {
    return this.questionCreationForm.get('topic');
  }

  get category() {
    return this.questionCreationForm.get('category');
  }

  get description() {
    return this.questionCreationForm.get('description');
  }

  get difficulty() {
    return this.questionCreationForm.get('difficulty');
  }


  get source() {
    return this.questionCreationForm.get('source');
  }

  get option1() {
    return this.questionCreationForm.get('option1');
  }

  get score1() {
    return this.questionCreationForm.get('score1');
  }

  get option2() {
    return this.questionCreationForm.get('option2');
  }

  get score2() {
    return this.questionCreationForm.get('score2');
  }

  get option3() {
    return this.questionCreationForm.get('option3');
  }

  get score3() {
    return this.questionCreationForm.get('score3');
  }

  get option4() {
    return this.questionCreationForm.get('option4');
  }

  get score4() {
    return this.questionCreationForm.get('score4');
  }

  uploadQuestion(event) {
    this.quesFiles.push(event.target.files[0]);
    console.log(this.quesFiles);
  }

  setMultipleValidators(){
    if(this.multiple.value==='No'){
      this.option3.setValidators(null);
      this.score3.setValidators(null);
      this.option4.setValidators(null);
      this.score4.setValidators(null);
    }
    this.option3.updateValueAndValidity();
    this.score3.updateValueAndValidity();
    this.option4.updateValueAndValidity();
    this.score4.updateValueAndValidity();
  }

  createQuestion(form) {
    if(this.quesFiles.length===0){
    this.submitted = true;
    console.log("inside create Question");
    if(this.questionCreationForm.invalid){
      this.toastr.error("Please fill all requried fields");
      return;
    }
  }
    this.questionnaire.eventId = this.event.id;
    this.questionnaire.userId = this.user.id;
    const data = new FormData();
    if (this.quesFiles.length > 0) {
      data.append('quesFile', this.quesFiles[0]);
      data.append('userId',this.user.id);
      data.append('eventId',this.event.id);
    }else{
      data.append('questionnaire',JSON.stringify(this.questionnaire));
      data.append('userId',this.user.id);
      data.append('eventId',this.event.id);
      console.log(this.questionnaire);
    }
      this.eventService.createQuestionnaire(data).subscribe(res => {
        this.toastr.success("Submitted Successfully");
        this.submitted = false;
        this.questionnaire = new Questionnaire();
        this.quesFiles = [];
        this.eventService.setSelectedTab('viewstatus');
      }, err => {
        console.log(err);
        this.toastr.error(err.error);
        this.quesFiles = [];
      });
  }

  cancel() {
    this.submitted = false;
    this.questionCreationForm.reset();
  }

}
