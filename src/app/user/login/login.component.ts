import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMsg = 'Lütfen bekleyiniz. Giriş yapılıyor...'
  alertColor = 'blue'
  inSubmission = false

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login() {
    this.showAlert = true
    this.alertMsg ='Lütfen bekleyiniz. Giriş yapılıyor...'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      this.inSubmission = false
      this.alertMsg = 'Hata! Tekrar deneyiniz!'
      this.alertColor = 'red'

      return
    }

    this.alertMsg = 'Başarılı! Giriş yapıldı!'
    this.alertColor = 'green'
  }
}
