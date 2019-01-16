import {Question} from './question';

export interface Session {
  id: number;
  name: String;
  questions: Question[];
  started: boolean;
  finished: boolean;
}
