import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../services/eventinfo.model';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;
  submitted: boolean;
  loading: boolean;
  user: User = new User();

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
    private router: Router,private eventService: EventService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    })
  } 

  get userid() {
    return this.loginForm.get('userid');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(){
    console.log('on submit')
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.user.id = this.userid.value;
    this.user.password = this.password.value;
    this.eventService.validateUser(this.user).subscribe(data=>{
      this.user = data;
      this.toastr.success('Login Success');
      this.eventService.setUser(this.user);
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
      this.toastr.error('Invalid Credentials');
    });

  }

  clear(){
    this.submitted = false;
    this.loginForm.reset();
    this.userid.setValidators(null);
    this.password.setValidators(null);
  }
}
