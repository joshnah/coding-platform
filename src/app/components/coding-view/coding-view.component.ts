import {
  ChangeDetectionStrategy,
  Component,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import { MOCK_CODING_QUESTION } from '../../mocks/codingQuestion.mock';
import { CodingQuestion } from '../../models/codingQuestion.model';
import { CodeRunComponent } from '../code-run/code-run.component';
@Component({
  selector: 'app-coding-view',
  imports: [EditorComponent, FormsModule, NgbNavModule, CodeRunComponent],
  templateUrl: './coding-view.component.html',
  styleUrl: './coding-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodingViewComponent implements OnInit {
  langugage = signal('python');
  editorOptions = {
    language: this.langugage(),
    scrollBeyondLastLine: false,
    lineHeight: 20,
    fontSize: 14,
    wordWrap: 'on',
    wrappingIndent: 'indent',
    automaticLayout: true, // Ajuste automatiquement la taille de l'éditeur
  };

  ngOnInit(): void {}

  active = 'description';
  codingQuestion = signal<CodingQuestion>(MOCK_CODING_QUESTION);
  code = linkedSignal(
    () =>
      this.codingQuestion().functionSignatures.find(
        (signature) => signature.language === this.langugage(),
      )?.signature || '',
  );
  submitSolution() {}
}
