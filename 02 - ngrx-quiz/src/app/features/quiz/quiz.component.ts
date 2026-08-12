import { Component, inject, Injector, signal } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { QuestionPresenterComponent } from './components/question-presenter/question-presenter.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ProgressComponent } from '../../components/progress/progress.component';
import { DoneComponent } from './components/done/done.component';
import { FlagComponent } from '../../components/flag/flag.component';
import { QuizStore } from './store/quiz.store';
import { AppStore } from '../../store/app.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { of, tap } from 'rxjs';

@Component({
  selector: 'app-quiz-page',
  imports: [
    SharedModule,
    QuestionPresenterComponent,
    ToolbarComponent,
    ProgressComponent,
    DoneComponent,
    FlagComponent,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export default class QuizPageComponent {
  readonly store = inject(QuizStore);
  readonly appStore = inject(AppStore);
  readonly foo = rxMethod<number>((a$) => {
    console.log('Parameter function was invoked');
    return a$.pipe(tap((x) => console.log('Tap', x)));
  });

  constructor() {
    this.doSomething();
  }

  doSomething() {
    const rx1 = this.foo(3);
    const rx2 = this.foo(of(4));
    const rx3 = this.foo(signal(5));
  }
}
