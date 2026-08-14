import { inject, Injectable } from '@angular/core';
import { DICTIONARIES_TOKEN } from '../tokens/dictionaries.token';
import { getDictionary } from '../store/app.helpers';
import { delayWhen, Observable, of, tap, timer } from 'rxjs';
import { Dictionary } from '../data/dictionaries';

@Injectable({ providedIn: 'root' })
export class DictionariesService {
  readonly #dictionaries = inject(DICTIONARIES_TOKEN);
  readonly languages = Object.keys(this.#dictionaries);

  private dictionaryOf(language: string) {
    return getDictionary(language, this.#dictionaries);
  }

  getDictionaryWithDelay(language: string): Observable<Dictionary> {
    const delay = Math.floor(Math.random() * 3000) + 1000;
    return of(this.dictionaryOf(language)).pipe(
      tap((_) =>
        console.log(
          `Started loading for ${language.toUpperCase()} with ${(delay / 1000).toFixed(1)}s delay`,
        ),
      ),
      delayWhen(() => timer(delay)),
      tap((_) => console.log(`Finished ${language.toUpperCase()}`)),
    );
  }
}
