import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Questionnaire, User } from '../services/eventinfo.model';
import { EventService } from '../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  questionCreationForm: FormGroup;
  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;
  submitted: boolean;
  questionnaire: Questionnaire = new Questionnaire();
  stackList: ['Java', '.Net', 'Angular', 'HTML', 'CSS'];
  user: User = new User();
  isCollapsedStatus = true;
  isCollapsedCreating = true;
  practiceQuestionsList: Questionnaire[] = [];
  filteredPracticeQuestionsList: Questionnaire[] = [];

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.user = this.eventService.getUser();
    this.getPracticeQuestions();
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

  getPracticeQuestions() {
    this.eventService.getUserQuestionList(this.eventService.getId(), this.user.id, 'Practice').subscribe(data => {
      this.practiceQuestionsList = data;
      this.filterQuestionList(this.practiceQuestionsList);
    
        if (this.filteredPracticeQuestionsList.length > 0) {
          this.questionCreationForm.disable();
        }
    
     
    })
  }

  filterQuestionList(practiceList: Questionnaire[]) {
    if (practiceList['Under Review'].length > 0) {
      this.filteredPracticeQuestionsList = practiceList['Under Review'];
    } else if (practiceList['Accepted'].length > 0) {
      this.filteredPracticeQuestionsList = practiceList['Accepted'];
    } else if (practiceList['Rejected'].length > 0) {
      this.filteredPracticeQuestionsList = practiceList['Rejected'];
    } else if (practiceList['Partially Accepted'].length > 0){
      this.filteredPracticeQuestionsList = practiceList['Partially Accepted'];
    }
  }



  createQuestion(form) {
    this.submitted = true;
    if (this.filteredPracticeQuestionsList.length !== 0) {

      this.toastr.error("Only one Practice Question Can Be Submitted");
     
    } else {
      if (this.questionCreationForm.invalid) {
        this.toastr.error("Please fill all requried fields");
        return;
      }
      this.questionnaire.userId = this.user.id;
      this.questionnaire.eventId = this.eventService.getId();
      this.questionnaire.type = 'Practice';
      const data = new FormData();
      data.append('questionnaire', JSON.stringify(this.questionnaire));
      data.append('eventId', this.eventService.getId())
      data.append('userId', this.user.id);
      console.log(this.questionnaire);
      this.eventService.createQuestionnaire(data).subscribe(res => {
        this.toastr.success("Submitted Successfully");
        this.submitted = false;
        this.questionnaire = new Questionnaire();
        this.getPracticeQuestions();
      }, err => {
        console.log(err);
        this.toastr.error(err.error);
      });
    }
  }

  cancel() {
    this.submitted = false;
    this.questionCreationForm.reset();
  }

}
