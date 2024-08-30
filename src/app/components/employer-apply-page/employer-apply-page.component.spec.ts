import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerApplyPageComponent } from './employer-apply-page.component';

describe('EmployerApplyPageComponent', () => {
  let component: EmployerApplyPageComponent;
  let fixture: ComponentFixture<EmployerApplyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerApplyPageComponent]
    });
    fixture = TestBed.createComponent(EmployerApplyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
