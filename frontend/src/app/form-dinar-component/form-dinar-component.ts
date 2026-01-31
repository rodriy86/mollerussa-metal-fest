import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
    poblacion: '',
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

  constructor(private router: Router, private http: HttpClient) { }

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
    this.formData.preuTotal=this.total;

    this.donacion = this.formData.donacionCancer ? 2 : 0;

    // ✅ DEBUG: Verifica que se ejecuta y los valores
    /*console.log('Calculando total:', {
      donacionCancer: this.formData.donacionCancer,
      donacion: this.donacion,
      subtotal: this.total,
      totalFinal: this.total + this.donacion,
      platos: {
        plato1: this.formData.plato1,
        vegetariano: this.formData.platoVegetariano,
        celiacos: this.formData.platoCeliacos,
        infantil: this.formData.platoInfantil
      }
    });*/
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

    // Validar que la suma de platos no exceda el número de personas
    /*const totalPlatos = this.formData.plato1 + this.formData.platoVegetariano +
      this.formData.platoCeliacos + this.formData.platoInfantil;

    if (totalPlatos > this.formData.numPersonas) {
      alert('La suma de platos no puede ser mayor que el número de personas.');
      return;
    }*/

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
      //this.formData.numPersonas >= 0 &&
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