import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideAnimations(),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideAnimationsAsync(),
  provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
  providePrimeNG({
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: false
      }
    }
  }),
  importProvidersFrom([NgxSpinnerModule, BrowserAnimationsModule]),
    ConfirmationService,
    MessageService
  ]
};
