import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';


import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {jwtInterceptor} from "./jwt.interceptor";
import {
  provideMomentDateAdapter
} from "@angular/material-moment-adapter";

export const appConfig: ApplicationConfig = {
  providers: [
     provideMomentDateAdapter({
      parse: {
        dateInput: ['l', 'LL'],
      },
      display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
    }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    ), provideAnimationsAsync(),
  ],
};
