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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-run',
  imports: [FormsModule],
  templateUrl: './code-run.component.html',
  styleUrl: './code-run.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeRunComponent {
  code = input('');
  executionService = inject(ExecutionService);
  output = signal<CodeExecutionResult | null>(null);
  stdin = signal('');
  language = input('');
  private spinner = inject(SpinnerService);

  executeCode() {
    this.spinner.openGlobalSpinner();
    this.executionService
      .executeCode(this.code(), this.language(), this.stdin()!)
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
