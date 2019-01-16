import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiCallsService} from '../api-calls.service';
import {Session} from '../types/session';
import {interval, Observable} from 'rxjs';
import {Question} from '../types/question';
import {Answer} from '../types/answer';
import {flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentSession$: Observable<Session>;
  currentQuestion$: Observable<Question>;
  currentAnswerSelected: number;
  lastQuestionAnswered: number;

  constructor(private route: ActivatedRoute, private apiService: ApiCallsService) {
    route.params.subscribe(p => {
      this.currentSession$ = this.apiService.getSession(p.id);
      this.currentQuestion$ = this.apiService.getCurrentQuestion(p.id);
    });
  }

  ngOnInit() {
  }
  saveAnswer(questionId: number, answerId: number): void {
    this.apiService.saveChosenAnswer(questionId, answerId);
    this.currentAnswerSelected = answerId;
    this.lastQuestionAnswered = questionId;
  }

  startSession(id: number) {
    this.apiService.startASession(id);
  }

  finishQuestion(id: number) {
    this.apiService.finishAQuestion(id);
  }

}
