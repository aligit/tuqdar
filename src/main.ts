import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';

// import App from './app/app-root.ag';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// bootstrapApplication(App, appConfig);
bootstrapApplication(AppComponent, appConfig);
