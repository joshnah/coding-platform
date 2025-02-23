import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExecutionService {
  constructor() {}
  private http = inject(HttpClient);
  executeCode(
    code: string,
    language: string,
    input: string,
  ): Observable<CodeExecutionResult> {
    return this.http.post<CodeExecutionResult>('/coding-questions/execute', {
      code,
      language,
      input,
    } as CodeExecution);
  }
}
