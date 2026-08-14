import { Injectable } from '@angular/core';
import { Observable, delay, map, of, tap } from 'rxjs';
import { Question } from '../models/question.model';
import { randomColourQuiz } from './helpers';

@Injectable({ providedIn: 'root' })
export class ColourQuizGeneratorService {
  createRandomQuizAsync(): Observable<Question[]> {
    return of(1).pipe(
      tap((_) => console.log('Generating quiz...')),
      map((_) => randomColourQuiz()),
      delay(2000),
    );
  }

  createRandomQuizSync(): Question[] {
    return randomColourQuiz();
  }
}
