import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import { UserProvider } from '../providers/user/user';

platformBrowserDynamic().bootstrapModule(AppModule);
