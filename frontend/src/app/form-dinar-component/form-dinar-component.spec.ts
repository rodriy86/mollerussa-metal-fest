import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDinarComponent } from './form-dinar-component';

describe('FormAcreditacioComponent', () => {
  let component: FormDinarComponent;
  let fixture: ComponentFixture<FormDinarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDinarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
