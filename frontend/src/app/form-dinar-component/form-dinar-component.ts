import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  errorMensaje: string = '';

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
    this.errorMensaje = '';
  }

  // GETTER para validación del formulario
  get formEsValido(): boolean {
    return (
      this.formData.nombre.trim() !== '' &&
      this.formData.apellidos.trim() !== '' &&
      this.formData.dni.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.aceptoTerminos === true &&
      this.formData.aceptoPoliticaPrivacidad === true
    );
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
    this.errorMensaje = '';

    // Forzar detección de cambios después de cambiar formSubmitted
    this.cdr.detectChanges();

    // Validaciones
    if (!this.formEsValido) {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios correctamente.';
      alert(this.errorMensaje);
      return;
    }

    // Validar que haya al menos un plato seleccionado
    const totalPlatos = this.formData.plato1 + this.formData.platoVegetariano + 
                       this.formData.platoCeliacos + this.formData.platoInfantil;
    
    if (totalPlatos === 0) {
      this.errorMensaje = 'Debes seleccionar al menos un plato.';
      alert(this.errorMensaje);
      return;
    }

    this.enviando = true;

    try {
      const respuesta = await this.enviarReserva();

      // Mostrar modal de transferencia
      this.showModalTransferencia = true;
      
      // Cambiar enviando a false ANTES de detectar cambios
      this.enviando = false;
      this.cdr.detectChanges();

    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          this.errorMensaje = 'No se pudo conectar con el servidor. Verifica tu conexión.';
        } else if (error.status === 404) {
          this.errorMensaje = 'La URL del servidor no es correcta.';
        } else if (error.status === 500) {
          this.errorMensaje = 'Error interno del servidor. Inténtalo más tarde.';
        } else {
          this.errorMensaje = `Error ${error.status}: ${error.statusText}`;
        }
      } else {
        this.errorMensaje = 'Error al enviar la reserva. Por favor, inténtalo de nuevo.';
      }
      
      alert(this.errorMensaje);
      
      // En caso de error, también resetear enviando
      this.enviando = false;
      this.cdr.detectChanges();
    }
  }

  async enviarReserva() {
    // Calcular el total actualizado
    this.calcularTotal();
    
    // Preparar datos para el backend
    const datosEnvio = {
      nombre: this.formData.nombre,
      apellidos: this.formData.apellidos,
      dni: this.formData.dni,
      email: this.formData.email,
      numPersonas: this.formData.numPersonas,
      plato1: this.formData.plato1,
      platoVegetariano: this.formData.platoVegetariano,
      platoCeliacos: this.formData.platoCeliacos,
      platoInfantil: this.formData.platoInfantil,
      preuTotal: this.total + this.donacion,
      donacionCancer: this.formData.donacionCancer
    };

    // Detectar entorno: local vs producción
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    const apiUrl = isLocal 
      ? 'http://localhost:3000/api/comida-solidaria'
      : 'https://mollerussa-metal-fest-production.up.railway.app/api/comida-solidaria';

    try {
      const respuesta = await firstValueFrom(
        this.http.post(apiUrl, datosEnvio)
      );
      return respuesta;
    } catch (error) {
      throw error;
    }
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
    if (!this.formSubmitted) return false;
    
    const fieldValue = this.formData[fieldName as keyof typeof this.formData];

    if (fieldName === 'plato1' || fieldName === 'platoVegetariano' || 
        fieldName === 'platoCeliacos' || fieldName === 'platoInfantil' || 
        fieldName === 'numPersonas') {
      return false;
    }

    return !fieldValue && fieldValue !== false;
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
    this.errorMensaje = '';
  }
}