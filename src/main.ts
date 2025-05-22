import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 3500,
      progressBar: true,
      closeButton: true,
      newestOnTop: true,
      preventDuplicates: true,
    }),
  ],
}).catch((err) => console.error(err));
