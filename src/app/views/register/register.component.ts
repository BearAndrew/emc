import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../_service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  fg: FormGroup;

  error_messages = {
    username: [
      { type: 'required', message: 'User name is required.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email is format error.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length must be more than 6.' },
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm password is required.' },
      { type: 'passwordNotMatch', message: 'Confirm password is not match.' },
    ]
  };

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatch.bind(this)
    });
  }

  passwordMatch(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  get username() { return this.fg.get('username'); }
  get email() { return this.fg.get('email'); }
  get password() { return this.fg.get('password'); }
  get confirmPassword() { return this.fg.get('confirmPassword'); }


  addToast(className: string, title: string, msg: string) {
    // this.messageService.clear();
    this.messageService.add({key: 'bc', severity: className, summary: title, detail: msg});
  }


  register(email: string, pwd: string) {
    console.log('email: ' + JSON.stringify(email), ', pwd: ' + pwd);
    this.authenticationService.registeredEmail(email, pwd).then(
      (resolve) => {
        console.log(resolve);
    },
      (rejects) => {
        console.log(rejects);
      }
    );
  }


  sendEmailVerification() {
    this.authenticationService.sendEmailVerification().then(
      (resolve) => {
        console.log(resolve);
        this.addToast('success', '成功', resolve);
    },
      (rejects) => {
        console.log(rejects);
        this.addToast('error', '失敗', rejects);
      }
    );
  }

}
