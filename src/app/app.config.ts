import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './core/services/config.service';

export function configServiceFactory(config: ConfigService): () => Promise<boolean> {
  return (): Promise<boolean> => config.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    ConfigService,
      {
        provide: APP_INITIALIZER,
        useFactory: configServiceFactory,
        deps: [ConfigService],
        multi: true
      },
    provideRouter(routes),
    provideAnimations(), 
    importProvidersFrom(HttpClientModule)]
};
