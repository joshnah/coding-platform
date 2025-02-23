import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import { MOCK_CODING_QUESTION } from '../../mocks/codingQuestion.mock';
import { CodingQuestion } from '../../models/codingQuestion.model';
import { CodeRunComponent } from '../code-run/code-run.component';
@Component({
  selector: 'app-coding-view',
  standalone: true,
  imports: [EditorComponent, FormsModule, NgbNavModule, CodeRunComponent],
  templateUrl: './coding-view.component.html',
  styleUrl: './coding-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodingViewComponent {
  editorOptions = {
    language: 'json',
    scrollBeyondLastLine: false,
    lineHeight: 20,
    fontSize: 14,
    wordWrap: 'on',
    wrappingIndent: 'indent',
    automaticLayout: true, // Ajuste automatiquement la taille de l'éditeur
  };

  active = 'description';
  code = '';
  codingQuestion = signal<CodingQuestion>(MOCK_CODING_QUESTION);
  submitSolution() {}
}
