import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { Question } from '../models/question.model';
import { randomColourQuiz } from './helpers';

@Injectable({ providedIn: 'root' })
export class ColourQuizGeneratorService {
  createRandomQuiz(): Observable<Question[]> {
    return of(1).pipe(
      map((_) => randomColourQuiz()),
      delay(2000),
    );
  }
}
