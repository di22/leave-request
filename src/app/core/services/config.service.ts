import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Configuration, Environment } from '../models/configuration';
import { SettingsService } from './settings.service';


@Injectable()
export class ConfigService {
  private config!: Configuration;
  configUrl = '/assets/config';
  envUrl = 'env';
  private httpClient: HttpClient;

  constructor(private httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(this.httpBackend);
  }

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        this.loadConfig().subscribe(
          config => {
            this.config = config;
            SettingsService.configurationEnvironment = this.config;
            resolve(true);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  loadConfig(): Observable<Configuration> {
    return this.loadEnvironment().pipe(
      mergeMap(currentEnv => {
        return this.loadFile<Configuration>(this.configUrl, currentEnv.env);
      })
    );
  }

  loadEnvironment(): Observable<Environment> {
    return this.loadFile<Environment>(this.configUrl, this.envUrl);
  }

  loadFile<T>(url: string, env: string): Observable<T> {
    return this.getJSON(`${url}/${env}.json`);
  }

  public getJSON<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }
}
