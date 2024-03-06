import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RequestService } from '../../domain/request/request.service';
import { Request } from '../../domain/request/models/request';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import { RequestSummaryComponent } from "./request-summary/request-summary.component";
import { RequestHistoryComponent } from "./request-history/request-history.component";
import { RequestDetailsComponent } from "./request-details/request-details.component";
import { PersonalDetailsComponent } from "./personal-details/personal-details.component";

@Component({
    selector: 'app-request',
    standalone: true,
    templateUrl: './request.component.html',
    styleUrl: './request.component.scss',
    imports: [RequestSummaryComponent, RequestHistoryComponent, RequestDetailsComponent, PersonalDetailsComponent]
})
export class RequestComponent implements OnInit {
  request: Request | null;
  destroyRef: DestroyRef = inject(DestroyRef);
  requestFailed: boolean = false;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.getRequest(3);
  }

  getRequest(id: number): void {
    this.requestService.getRequest(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.requestFailed = false;
      this.request = res;
    }, err => {
      this.requestFailed = true;
    })
  }
}
