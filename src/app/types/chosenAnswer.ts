import {Question} from './question';
import {Answer} from './answer';

export interface ChosenAnswer {
  value: number;
  name: string;
}

export interface ChosenAnswerFromAPI {
  id: number;
  answer: Answer;
}
