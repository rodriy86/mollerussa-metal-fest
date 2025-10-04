import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleGaleriaComponent } from './detalle-galeria-component';

describe('Galeria', () => {
  let component: DetalleGaleriaComponent;
  let fixture: ComponentFixture<DetalleGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleGaleriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
