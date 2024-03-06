import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFieldComponent } from './date-field.component';
import { Component, DebugElement } from '@angular/core';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-test-date-field',
    standalone: true,
    template: `
    <app-date-field [label]="label" [control]="date"></app-date-field>
`,
    imports: [DateFieldComponent]
})
export class TestDateFieldComponent {
label: string = 'testLabel';
date: FormControl = new FormControl('2024-03-01');
}

describe('DateFieldComponent', () => {
  let component: TestDateFieldComponent;
  let fixture: ComponentFixture<TestDateFieldComponent>;
  let dateComponent: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDateFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestDateFieldComponent);
    component = fixture.componentInstance;
    dateComponent = fixture.debugElement.query(By.directive(DateFieldComponent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has correct input value', () => {
    expect(dateComponent.componentInstance.label).toEqual(component.label);
    expect(dateComponent.componentInstance.control).toEqual(component.date);
  });

  it('should render label and input', () => {
    const label = dateComponent.query(By.css('label'));
    const input = dateComponent.query(By.css('input'));
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('should input has type date', () => {
    const input = dateComponent.query(By.css('input'));
    expect(input.nativeElement.type).toEqual('date');
  });

  it('should label value equal input value', () => {
    const label = dateComponent.query(By.css('label'));
    expect(label.nativeElement.textContent).toEqual(`${component.label} : `);
  });
});
