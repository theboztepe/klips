import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthenticated = false;
  constructor(public modal: ModalService, public auth: AuthService, private afAuth:AngularFireAuth) {
    auth.isAuthenticated$.subscribe(
      (status) => (this.isAuthenticated = status)
    );
  }

  ngOnInit(): void {}

  openModal($event: Event) {
    $event.preventDefault();

    this.modal.toogleModal('auth');
  }

  async logout($event:Event){
    $event.preventDefault()

    await this.afAuth.signOut()
  }
}
