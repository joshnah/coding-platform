import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CodeExecution,
  CodeExecutionResult,
} from '../models/codingQuestion.model';

@Injectable({
  providedIn: 'root',
})
export class ExecutionService {
  constructor() {}
  private http = inject(HttpClient);
  private url = 'localhost:5000';
  executeCode(
    code: string,
    language: string,
    input: string,
  ): Observable<CodeExecutionResult> {
    return this.http.post<CodeExecutionResult>(`${this.url}/execute`, {
      code,
      language,
      input,
    } as CodeExecution);
  }
}
