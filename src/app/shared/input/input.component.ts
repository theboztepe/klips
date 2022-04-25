import { FormControl } from '@angular/forms';
import { RegisterComponent } from './../../user/register/register.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() type = 'text';
  @Input() placeholder = '';
@Input() format = '';

  constructor() {}

  ngOnInit(): void {}
}
