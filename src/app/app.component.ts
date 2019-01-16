import { Component, OnInit } from '@angular/core';
import {ApiCallsService} from './api-calls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Menti-Nael';
  questions;
  sessions;

  constructor(private apiCallsService: ApiCallsService) {}

  ngOnInit() {
    // this.getQuestions();
    // this.getSessions();
  }
}
