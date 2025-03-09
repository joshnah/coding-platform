import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import { CodingQuestion } from '../../models/codingQuestion.model';
import { CodeRunComponent } from '../code-run/code-run.component';
import { CodeGeneratorService } from '../../services/code-generator.service';
import { ExecutionService } from '../../services/execution.service';
@Component({
  selector: 'app-coding-view',
  imports: [EditorComponent, FormsModule, NgbNavModule, CodeRunComponent],
  templateUrl: './coding-view.component.html',
  styleUrl: './coding-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodingViewComponent implements OnInit {
  codeGeneratorService = inject(CodeGeneratorService);
  executionService = inject(ExecutionService);
  language = signal('python');
  editorOptions = {
    language: this.language(),
    scrollBeyondLastLine: false,
    lineHeight: 20,
    fontSize: 14,
    wordWrap: 'on',
    wrappingIndent: 'indent',
    automaticLayout: true, // Ajuste automatiquement la taille de l'éditeur
  };

  ngOnInit(): void {}

  active = 'description';
  codingQuestion = resource({
    loader: async () => {
      const response = await fetch('http://localhost:5000/questions/mock');
      return response.json();
    },
  });
  code = linkedSignal(() =>
    this.codingQuestion.hasValue()
      ? this.codeGeneratorService.generateSubmissionCode(
          this.codingQuestion.value(),
          this.language(),
        )
      : '',
  );
  submitSolution() {
    this.executionService
      .submit(this.code(), this.language())
      .subscribe((a) => console.log(a));
  }
}
