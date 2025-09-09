import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

// Optional flag to skip spinner per request
export const SKIP_SPINNER = new HttpContextToken<boolean>(() => false);

// Simple global counter for in-flight requests
let pending = 0;
let hideTimer: any = null;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  const skip = req.context.get(SKIP_SPINNER);

  if (!skip) {
    if (pending === 0) {
      // first request -> show spinner
      spinner.show();
      // cancel any scheduled hide just in case
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    }
    pending++;
  }

  return next(req).pipe(
    finalize(() => {
      if (!skip) {
        pending = Math.max(0, pending - 1);
        if (pending === 0) {
          // tiny debounce to avoid flicker between rapid requests
          hideTimer = setTimeout(() => spinner.hide(), 160);
        }
      }
    })
  );
};
