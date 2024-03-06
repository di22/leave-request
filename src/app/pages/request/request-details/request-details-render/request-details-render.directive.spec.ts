import { TestBed } from '@angular/core/testing';
import { RequestDetailsRenderDirective } from './request-details-render.directive';
import { ViewContainerRef } from '@angular/core';

describe('RequestDetailsRenderDirective', () => {
  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [ViewContainerRef],
    });
  });


  it('should create an instance', () => {
    TestBed.runInInjectionContext((): void => {
      const directive = new RequestDetailsRenderDirective();
      expect(directive).toBeTruthy();
    });
   
  });
});
