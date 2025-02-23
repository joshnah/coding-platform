import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  NgxMonacoEditorConfig,
  provideMonacoEditor,
} from 'ngx-monaco-editor-v2';
import { provideHttpClient } from '@angular/common/http';

export const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: window.location.origin + '/assets/monaco/min/vs',
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideMonacoEditor(monacoConfig),
    provideHttpClient(),
  ],
};
