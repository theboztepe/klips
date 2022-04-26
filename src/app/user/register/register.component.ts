import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from './../validators/email-taken';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}

  inSubmission = false;

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTaken.validate]
  );
  age = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    Validators.minLength(6),
  ]);
  confirm_password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    Validators.minLength(6),
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);

  showAlert = false;
  alertMsg = 'Lütfen bekle! Hesabın oluşturuluyor...';
  alertColor = 'blue';

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirm_password: this.confirm_password,
      phoneNumber: this.phoneNumber,
    },
    RegisterValidators.match('password', 'confirm_password')
  );

  async register() {
    this.showAlert = true;

    this.alertMsg = 'Lütfen bekle! Hesabın oluşturuluyor...';
    this.alertColor = 'blue';

    this.inSubmission = true;

    const { email, password } = this.registerForm.value;

    try {
      await this.auth.createUser(this.registerForm.value);
    } catch (e) {
      this.alertMsg = 'Hata! Daha sonra tekrar deneyiniz!';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Başarılı!';
    this.alertColor = 'green';
  }
}
