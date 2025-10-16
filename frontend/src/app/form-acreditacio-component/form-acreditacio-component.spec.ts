import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAcreditacioComponent } from './form-acreditacio-component';

describe('FormAcreditacioComponent', () => {
  let component: FormAcreditacioComponent;
  let fixture: ComponentFixture<FormAcreditacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAcreditacioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAcreditacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
