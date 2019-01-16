import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Session} from './types/session';
import {interval, Observable, of, merge, combineLatest} from 'rxjs';
import {Question} from './types/question';
import {Answer} from './types/answer';
import { flatMap, map, mergeMap, share, startWith, take} from 'rxjs/operators';
import {ChosenAnswer, ChosenAnswerFromAPI} from './types/chosenAnswer';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  private sessionObservable: Observable<Session>;

  constructor(private httpClient: HttpClient) { }

  API_URL = environment.apiURL;

  getSessions(): Observable<Session[]> {
    return this.httpClient.get<Session[]>(this.API_URL + '/sessions');
  }

  getSession(id: number): Observable<Session> {
    if (!this.sessionObservable) {
      this.sessionObservable =  merge(interval(1000), of(1)).pipe(
        mergeMap(() => this.httpClient.get<Session>(`${this.API_URL}/sessions/${id}`)),
        share()
      );
    }
    return this.sessionObservable;
  }

  getCurrentQuestion(sessionId: number): Observable<Question> {
    return this.getSession(sessionId).pipe(
      map(session => session.questions),
      map(arr => arr.filter(item => !item.finished)),
      map(arr => arr[0]),
    );
  }

  getCurrentQuestionChosenAnswers(sessionId: number): Observable<ChosenAnswer[]> {
    return this.getCurrentQuestion(sessionId).pipe(
      flatMap(question => this.httpClient.get<ChosenAnswerFromAPI[]>(`${this.API_URL}/questions/${question.id}/chosenAnswers`)),
      map( answersFromAPI => {

        const formattedAnswers: ChosenAnswer[] = answersFromAPI.map(a => {
          return {
            value: 0,
            name: a.answer.value,
          };
        });

        return answersFromAPI.reduce((acc: ChosenAnswer[], obj) => {
          const idFound = acc.findIndex(
            val => val.name === obj.answer.value,
          );
          if (idFound === -1) {
            return [...acc, { value: 1, name: obj.answer.value }];
          } else {
            return acc.map(item => {
              if (item.name === obj.answer.value) {
                return {
                  name: item.name,
                  value: item.value + 1,
                };
              }
              return item;
            });
          }
        }, formattedAnswers);
      })
    );
  }

  saveChosenAnswer(questionId: number, answerId: number): void {
    this.httpClient.post(`${this.API_URL}/questions/${questionId}/choseAnswer/${answerId}`, null).subscribe(() => {});
  }

  questionCountDown(): Observable<number> {
    const countStart = 30;
    return interval(1000)
      .pipe(
        map(i => countStart - i),
        take(countStart),
        startWith(countStart),
      );
  }

  startASession(id: number): void {
    this.httpClient.put(`${this.API_URL}/sessions/${id}/start`, null).subscribe(() => {});
  }

  finishAQuestion(id: number): void {
    this.httpClient.put(`${this.API_URL}/questions/${id}/finish`, null).subscribe(() => {});
  }
}
