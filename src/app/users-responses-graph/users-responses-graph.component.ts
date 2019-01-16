import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ChosenAnswer} from '../types/chosenAnswer';
import {ApiCallsService} from '../api-calls.service';

@Component({
  selector: 'app-users-responses-graph',
  templateUrl: './users-responses-graph.component.html',
  styleUrls: ['./users-responses-graph.component.css']
})
export class UsersResponsesGraphComponent implements OnInit {

  @Input() sessionId: number;
  single: any[];
  multi: any[];

  values$: Observable<any[]> = of([{name: 'Non', value: 2}, {name: 'Oui', value: 3}]);
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Réponses';
  showYAxisLabel = true;
  yAxisLabel = 'Nombre';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private apiService: ApiCallsService) {
    this.values$ = this.apiService.getCurrentQuestionChosenAnswers(this.sessionId);
    this.values$.subscribe(v => console.log(v));
  }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }

}
