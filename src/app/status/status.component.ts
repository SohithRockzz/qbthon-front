import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Event, Questionnaire, User, EventDetails } from '../services/eventinfo.model';
import { EventService } from '../services/event.service';
import * as xlsx from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  questionCreationForm: FormGroup;
  event: EventDetails;
  isCollapsedAccepted = true;
  isCollapsedRejected = true;
  isCollapsedPartiallyApp = true;
  isCollapsedUnderReviewing = true;

  isCollapsedAcceptedSME = true;
  isCollapsedRejectedSME = true;
  isCollapsedPartiallyAppSME = true;
  isCollapsedUnderReviewingSME = true;

  isCollapsedSubmitted = true;
  isCollapsedCheck = true;
  questionsExcelList = [];
  questionsMapList: Questionnaire[] = [];
  smeQuestionsMapList: Questionnaire[] = [];
  showModal = false;
  submitted: boolean;
  questionnaire: Questionnaire = new Questionnaire();
  user: User = new User();
  stackList: string[] = [];

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private toastr: ToastrService) { }

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
      status: [''],
      comment: ['']
    });
    this.event = this.eventService.getEvent();
    this.event.skills.split(",").forEach(stack => {
      this.stackList.push(stack);
    });
    this.user = this.eventService.getUser();
    if (this.user.adminFlag) {
      this.getQuestionsMapList();
    } else {
      if (this.event.role === 'SME') {
        this.getSMEQuestionsList();
      }
      this.getUserQuestionsList();
    }
    if (this.event.role === 'USER' ) {
      this.status.disable();
      this.comment.disable();
    }
    this.setValidation()
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
  get status() {
    return this.questionCreationForm.get('status');
  }

  get comment() {
    return this.questionCreationForm.get('comment');
  }

  getSMEQuestionsList() {
    this.eventService.getSMEQuestionsList(this.event.id, this.user.id).subscribe(data => {
      console.log(data);
      this.smeQuestionsMapList = data;
    }, err => {
      this.toastr.error("Error in fetching SME questions list. Please try later")
    })
  }
  setValidation(){
    if(this.event.role==='SME'){
      
    }
  }

  getUserQuestionsList() {
    this.eventService.getUserQuestionList(this.event.id, this.user.id, 'Active').subscribe(data => {
      this.questionsMapList = data;
    }, err => {
      this.toastr.error('Error in fetching the questionnaire list. Please try later');
    })
  }

  getQuestionsMapList() {
    this.eventService.getQuestionsMapList(this.event.id).subscribe(res => {
      this.questionsMapList = res;
    }, err => {
      this.toastr.error('Error in fetching the questionnaire list. Please try later');
    });
  }
  exportToExcel() {
    this.eventService.getQuestionsExcelList(this.event.id).subscribe(res => {
      this.questionsExcelList.push(...res);
      if (this.questionsExcelList.length !== 0) {
        setTimeout(() => {
          const ws: xlsx.WorkSheet =
            xlsx.utils.table_to_sheet(this.epltable.nativeElement);
          const wb: xlsx.WorkBook = xlsx.utils.book_new();
          xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
          xlsx.writeFile(wb, 'questions.xlsx');
        }, 4000)

      } else {
        this.toastr.error("No Questions has submitted to download");
      }
    }, err => {
      this.toastr.error(err.message);
    });

  }

  setCommentsValidators() {
    if (this.questionnaire.status === 'Under Review' || this.questionnaire.status === 'Accepted') {
      this.comment.setValidators(null);
    } else {
      this.comment.setValidators(Validators.required);
    }
    this.comment.updateValueAndValidity();
  }

  editQuestion(question) {
    console.log("inside edit question" + JSON.stringify(question));
    var myElement = document.getElementById("updateQuestionModal");
    myElement.className = "modal show";
    this.showModal = true;
    this.submitted = true;
    this.questionnaire = question;
    //  this.questionnaire.stack='Java';
  }

  hideModal() {
    var myElement = document.getElementById("updateQuestionModal");
    myElement.className = "modal fade";
    this.showModal = false;
  }

  updateQuestion() {
    console.log("questionnaire->" + JSON.stringify(this.questionnaire));
    if (this.event.role === 'SME') {
      console.log("SME");
      this.eventService.updateQuestionBySME(this.questionnaire.id, this.questionnaire.status,this.questionnaire.comment).subscribe(data => {
        this.toastr.success("Updated Successfully");
        this.getSMEQuestionsList();
      },error => {
        this.toastr.error(error.error);
      });
    } else {
      this.eventService.updateQuestion(this.questionnaire).subscribe(
        res => {
          this.toastr.success("Updated Successfully");
          this.getUserQuestionsList();
        },
        error => {
          this.toastr.error(error.error);
        }
      );
    }
    var myElement = document.getElementById("updateQuestionModal");
    myElement.className = "modal fade";
    this.showModal = false;
  }
  setMultipleValidators() {
    if (this.multiple.value === 'No') {
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

}
