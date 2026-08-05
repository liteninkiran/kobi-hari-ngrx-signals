import { Component, inject } from '@angular/core';
import { SharedModule } from './shared.module';
import { QuizStore } from './store/quiz.store';

@Component({
  selector: 'app-root',
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly store = inject(QuizStore);
}
