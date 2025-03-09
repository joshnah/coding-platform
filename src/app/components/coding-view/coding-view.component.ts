import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import { finalize } from 'rxjs';
import { CodeExecutionResult } from '../../models/codingQuestion.model';
import { CodeGeneratorService } from '../../services/code-generator.service';
import { ExecutionService } from '../../services/execution.service';
import { SpinnerService } from '../../services/spinner.service';
import { CodeRunComponent } from '../code-run/code-run.component';
@Component({
  selector: 'app-coding-view',
  imports: [EditorComponent, FormsModule, NgbNavModule, CodeRunComponent],
  templateUrl: './coding-view.component.html',
  styleUrl: './coding-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodingViewComponent {
  codeGeneratorService = inject(CodeGeneratorService);
  executionService = inject(ExecutionService);
  private spinner = inject(SpinnerService);

  language = signal('python');
  codeRunInput = linkedSignal(
    () => this.codingQuestion.value().testCases[0].input,
  );
  codeRunOutput = signal<CodeExecutionResult | null>(null);
  active = 'description';

  editorOptions = {
    language: this.language(),
    scrollBeyondLastLine: false,
    lineHeight: 20,
    fontSize: 14,
    wordWrap: 'on',
    wrappingIndent: 'indent',
    automaticLayout: true, // Ajuste automatiquement la taille de l'éditeur
  };

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
  hasErrorCompilation(): boolean {
    return this.codeRunOutput()?.status?.id === 6;
  }
  runCode() {
    this.spinner.openGlobalSpinner();
    this.executionService
      .executeCode(this.code(), this.language(), this.codeRunInput())
      .pipe(
        finalize(() => {
          this.spinner.closeGlobalSpinner();
        }),
      )

      .subscribe((codeExecutionResult: CodeExecutionResult) => {
        console.log('code execution', codeExecutionResult);
        this.codeRunOutput.set(codeExecutionResult);
      });
  }
}
