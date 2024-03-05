import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllinessComponent } from './illiness.component';

describe('IllinessComponent', () => {
  let component: IllinessComponent;
  let fixture: ComponentFixture<IllinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IllinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IllinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
