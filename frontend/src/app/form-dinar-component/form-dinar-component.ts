import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TranslatePipe } from '../pipes/translate.pipe';
import { configGlobal } from '../configGlobal';

@Component({
  selector: 'app-form-dinar',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './form-dinar-component.html',
})
export class FormDinarComponent {
  configGlobal = configGlobal;

  formData = {
    nombre: '',
    apellidos: '',
    dni: '',
    email: '',
    numPersonas: 0,
    plato1: 0,
    platoVegetariano: 0,
    platoCeliacos: 0,
    platoInfantil: 0,
    preuTotal: 0,
    donacionCancer: false,
    aceptoTerminos: false,
    aceptoPoliticaPrivacidad: false
  };

  formSubmitted = false;
  showPoliticaPrivacidad = false;
  showModalTransferencia = false;
  enviando = false;
  total = 0;
  donacion = 0;

  // Precios de los platos
  precios = {
    plato1: 10,
    platoVegetariano: 10,
    platoCeliacos: 10,
    platoInfantil: 10
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  // Calcular total
  calcularTotal() {
    this.total = (
      (this.formData.plato1 || 0) * this.precios.plato1 +
      (this.formData.platoVegetariano || 0) * this.precios.platoVegetariano +
      (this.formData.platoCeliacos || 0) * this.precios.platoCeliacos +
      (this.formData.platoInfantil || 0) * this.precios.platoInfantil
    );
    this.formData.preuTotal = this.total;
    this.donacion = this.formData.donacionCancer ? 2 : 0;
  }

  // Enviar formulario
  async onSubmit() {
    this.formSubmitted = true;

    if (!this.isFormValid()) {
      alert('Por favor, completa todos los campos obligatorios correctamente.');
      return;
    }

    if (!this.formData.aceptoTerminos || !this.formData.aceptoPoliticaPrivacidad) {
      alert('Debes aceptar los términos y condiciones y la política de privacidad.');
      return;
    }

    this.enviando = true;

    try {
      await this.enviarReserva();

      // Mostrar modal de transferencia
      this.showModalTransferencia = true;
      this.cdr.detectChanges(); // fuerza render inmediato

    } catch (error) {
      console.error('Error enviando reserva:', error);
      alert('Error al enviar la reserva. Por favor, inténtalo de nuevo.');
    } finally {
      this.enviando = false;
    }
  }

  async enviarReserva() {
  // Detectar entorn: localhost per desarrollament, Railway per producció
  const apiUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api/comida-solidaria'
    : 'mollerussa-metal-fest-production.up.railway.app/api/comida-solidaria';

  return await firstValueFrom(
    this.http.post(apiUrl, this.formData)
  );
}


  // Método para volver al inicio
  volverAInicio(): void {
    this.router.navigate(['/']);
  }

  openPoliticaPrivacidad() {
    this.showPoliticaPrivacidad = true;
    document.body.style.overflow = 'hidden';
  }

  closePoliticaPrivacidad() {
    this.showPoliticaPrivacidad = false;
    document.body.style.overflow = 'auto';
  }

  cerrarModalTransferencia() {
    this.showModalTransferencia = false;
    this.volverAInicio();
  }

  isFieldInvalid(fieldName: string): boolean {
    const fieldValue = this.formData[fieldName as keyof typeof this.formData];

    if (typeof fieldValue === 'number') {
      return this.formSubmitted && (fieldValue === null || fieldValue === undefined || fieldValue < 0);
    }

    return this.formSubmitted && (
      fieldValue === '' ||
      fieldValue === null ||
      fieldValue === undefined
    );
  }

  isFormValid(): boolean {
    return (
      this.formData.nombre !== '' &&
      this.formData.apellidos !== '' &&
      this.formData.dni !== '' &&
      this.formData.email !== '' &&
      this.formData.aceptoTerminos &&
      this.formData.aceptoPoliticaPrivacidad
    );
  }

  resetForm() {
    this.formData = {
      nombre: '',
      apellidos: '',
      dni: '',
      email: '',
      numPersonas: 0,
      plato1: 0,
      platoVegetariano: 0,
      platoCeliacos: 0,
      platoInfantil: 0,
      preuTotal: 0,
      donacionCancer: false,
      aceptoTerminos: false,
      aceptoPoliticaPrivacidad: false
    };
    this.formSubmitted = false;
    this.total = 0;
    this.donacion = 0;
  }
}
