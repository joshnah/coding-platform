import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  linkedSignal,
} from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { ExecutionService } from '../../services/execution.service';
import { CodeExecutionResult } from '../../models/codingQuestion.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-code-run',
  standalone: true,
  imports: [],
  templateUrl: './code-run.component.html',
  styleUrl: './code-run.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeRunComponent {
  code = input<string>('');
  exampleInput = input<string>();
  executionService = inject(ExecutionService);
  output = signal<CodeExecutionResult | null>(null);
  stdin = linkedSignal(() => this.exampleInput());

  private spinner = inject(SpinnerService);

  executeCode() {
    this.spinner.openGlobalSpinner();
    this.executionService
      .executeCode(this.code(), 'java', this.stdin()!)
      .pipe(
        finalize(() => {
          this.spinner.closeGlobalSpinner();
        }),
      )

      .subscribe((codeExecutionResult: CodeExecutionResult) => {
        console.log(codeExecutionResult);
        this.output.set(codeExecutionResult);
      });
  }
  hasErrorCompilation(): boolean {
    return this.output()?.status?.id === 6;
  }
}
