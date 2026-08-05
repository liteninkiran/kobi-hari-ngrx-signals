import { Component, inject } from '@angular/core';
import { SharedModule } from './shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { QuestionPresenterComponent } from './components/question-presenter/question-presenter.component';
import { ProgressComponent } from './components/progress/progress.component';
import { QuizStore } from './store/quiz.store';

@Component({
  selector: 'app-root',
  imports: [SharedModule, ToolbarComponent, QuestionPresenterComponent, ProgressComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly store = inject(QuizStore);
}
