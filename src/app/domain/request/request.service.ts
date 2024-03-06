import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from './models/request';
import { SettingsService } from '@core/services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = `${SettingsService.configurationEnvironment.api.baseUrl}/requests`;
 
  constructor(private http: HttpClient) { }

  getRequest(id: number): Observable<Request> {
    return this.http.get<Request>(`${this.url}/${id}`);
  }
}
