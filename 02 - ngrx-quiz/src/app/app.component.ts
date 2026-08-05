import { Component } from '@angular/core';
import { SharedModule } from './shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { QuestionPresenterComponent } from './components/question-presenter/question-presenter.component';

@Component({
  selector: 'app-root',
  imports: [SharedModule, ToolbarComponent, QuestionPresenterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
