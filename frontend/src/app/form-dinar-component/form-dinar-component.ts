import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-dinar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-dinar-component.html',
})
export class FormDinarComponent {
  formData = {
    nombre: '',
    apellidos: '',
    dni: '',
    poblacion: '',
    numMayores: 0,
    mayoresPlato1: 0,
    mayoresPlato2: 0,
    mayoresCafe: 0,
    mayoresBermut: 0,
    numMenores: 0,
    menoresPlato1: 0,
    menoresPlato2: 0,
    aceptoTerminos: false,
    aceptoPoliticaPrivacidad: false
  };

  formSubmitted = false;
  showPoliticaPrivacidad = false;
  enviando = false;
  total = 0;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  // Calcular total
  calcularTotal() {
    this.total = (
      (this.formData.mayoresPlato1 || 0) * 10 +
      (this.formData.mayoresPlato2 || 0) * 11 +
      (this.formData.mayoresCafe || 0) * 2 +
      (this.formData.mayoresBermut || 0) * 5 +
      (this.formData.menoresPlato1 || 0) * 10 +
      (this.formData.menoresPlato2 || 0) * 11
    );
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
      alert('¡Reserva enviada correctamente! Te contactaremos para confirmar el pago.');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error enviando reserva:', error);
      alert('Error al enviar la reserva. Por favor, inténtalo de nuevo.');
    } finally {
      this.enviando = false;
    }
  }

  async enviarReserva() {
    return this.http.post('http://localhost:3000/api/comida-solidaria', this.formData).toPromise();
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
      this.formData.poblacion !== '' &&
      this.formData.numMayores >= 0 &&
      this.formData.numMenores >= 0 &&
      this.formData.aceptoTerminos &&
      this.formData.aceptoPoliticaPrivacidad
    );
  }

  resetForm() {
    this.formData = {
      nombre: '',
      apellidos: '',
      dni: '',
      poblacion: '',
      numMayores: 0,
      mayoresPlato1: 0,
      mayoresPlato2: 0,
      mayoresCafe: 0,
      mayoresBermut: 0,
      numMenores: 0,
      menoresPlato1: 0,
      menoresPlato2: 0,
      aceptoTerminos: false,
      aceptoPoliticaPrivacidad: false
    };
    this.formSubmitted = false;
    this.total = 0;
  }
}