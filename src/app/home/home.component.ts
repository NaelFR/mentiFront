import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import {Observable} from 'rxjs';
import {Session} from '../types/session';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sessions: Observable<Session[]>;

  constructor(private apiCallsService: ApiCallsService) { }

  ngOnInit() {
    this.getSessions();
  }

  getSessions() {
    this.sessions = this.apiCallsService.getSessions();
  }

}
