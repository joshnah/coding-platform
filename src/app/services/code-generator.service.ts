import { Injectable } from '@angular/core';
import {
  CodingQuestion,
  FunctionSignature,
} from '../models/codingQuestion.model';

@Injectable({
  providedIn: 'root',
})
export class CodeGeneratorService {
  constructor() {}
  generateSubmissionCode(question: CodingQuestion, language: string): string {
    switch (language) {
      case 'python':
        return this.generatePythonCode(question);
      default:
        throw new Error('Unsupported language');
    }
  }

  generatePythonCode(question: CodingQuestion): string {
    const args = question.functionSignature.arguments
      .map((arg) => arg.name)
      .join(', ');

    const adjustedParsers = question.functionSignature.arguments.map((arg) => {
      const name = arg.name;
      switch (arg.type) {
        case 'int':
          return `    ${name} = int(input().strip())`;
        case 'string':
          return `    ${name} = input().strip()`;
        case 'boolean':
          return `    ${name} = input().strip().lower() == "true"`;
        case 'int[]':
          return `    ${name} = list(map(int, input().strip().split(',')))`;
        case 'string[]':
          return `    ${name} = input().strip().split(',')`;
        default:
          return `    ${name} = input().strip()`;
      }
    });

    const callArguments = question.functionSignature.arguments
      .map((arg) => arg.name)
      .join(', ');

    return `def ${question.functionName}(${args}):
    # Your code here
    pass

if __name__ == "__main__":
${adjustedParsers.join('\n')}
    output = ${question.functionName}(${callArguments})
    print(output)`;
  }
}
