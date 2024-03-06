import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationRowComponent } from './information-row.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-test-information-row',
    standalone: true,
    template: `
<app-information-row [key]="key" [value]="value"></app-information-row>

`,
    imports: [InformationRowComponent]
})
export class TestInformationRowComponent {
  key: string = 'testKey';
  value: string = 'testValue';
}

describe('InformationRowComponent', () => {
  let component: TestInformationRowComponent;
  let fixture: ComponentFixture<TestInformationRowComponent>;
  let rowComponent: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestInformationRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestInformationRowComponent);
    component = fixture.componentInstance;
    rowComponent = fixture.debugElement.query(By.directive(InformationRowComponent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has correct input value', () => {
    expect(rowComponent.componentInstance.key).toEqual(component.key);
    expect(rowComponent.componentInstance.value).toEqual(component.value);
  });

  it('should render key and value elements', () => {
    const key = rowComponent.query(By.css('[data-testid="key"]'));
    const value = rowComponent.query(By.css('[data-testid="value"]'));
    expect(key).toBeTruthy();
    expect(value).toBeTruthy();
  });

  it('should inputs values reflect in rendred elements', () => {
    const key = rowComponent.nativeElement.querySelector('[data-testid="key"]');
    const value = rowComponent.nativeElement.querySelector('[data-testid="value"]');
    expect(key.textContent).toEqual(`${component.key}: `);
    expect(value.textContent).toEqual(component.value);
  });

  it('should hide key element', () => {
    component.key = '';
    fixture.detectChanges();
    const key = rowComponent.query(By.css('[data-testid="key"]'));
    expect(key).toBeFalsy();
  });
});
