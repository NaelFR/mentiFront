import {Answer} from './answer';

export interface Question {
  id: number;
  value: string;
  type: string;
  finished: boolean;
  answers: Answer[];
}
