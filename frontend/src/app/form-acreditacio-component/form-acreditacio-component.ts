/*import { Component } from '@angular/core';

@Component({
  selector: 'app-form-acreditacio-component',
  imports: [],
  templateUrl: './form-acreditacio-component.html',
  styleUrl: './form-acreditacio-component.scss'
})
export class FormAcreditacioComponent {

}*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { configGlobal } from '../configGlobal';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-form-acreditacio',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './form-acreditacio-component.html',
})
export class FormAcreditacioComponent {
  //diasFestival = ['Viernes', 'Sábado', 'Domingo'];
  configGlobal = configGlobal;
  logoUrl = 'assets/icons/Logob.png';
  textoVolver = 'Volver al inicio';

  formData = {
    tipo: '',
    nombre: '',
    email: '',
    telefono: '',
    documentoIdentidad: '',
    ciudadResidencia: '',
    redesSociales: '',
    medio: '',
    plataformas: '',
    cobertura: '',
    necesidadesEspeciales: '',
    //dias: [] as string[],
    aceptoTerminos: false,
    aceptoPoliticaPrivacidad: false
  };
  formSubmitted = false;
  showPoliticaPrivacidad = false;
  enviando = false;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  //enviar correu
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
      await this.enviarSolicitud();
      alert('¡Solicitud enviada! Te contactaremos en breve.');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error enviando solicitud:', error);
      alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      this.enviando = false;
    }
  }

  async enviarSolicitud() {
    //return this.http.post(configGlobal.api.noticias, this.formData).toPromise();
    return this.http.post('http://localhost:3000/api/acreditacion', this.formData).toPromise();
  }//fi enviar correu

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
    const field = this.formData[fieldName as keyof typeof this.formData];
    return this.formSubmitted && (
      field === '' ||
      field === null ||
      field === undefined ||
      (Array.isArray(field) && field.length === 0)
    );
  }

  isEmailInvalid(): boolean {
    return this.formSubmitted &&
      (this.formData.email === '' ||
        !this.isValidEmail(this.formData.email));
  }

  isTelefonoInvalid(): boolean {
    return this.formSubmitted &&
      (this.formData.telefono === '' ||
        !this.isValidTelefono(this.formData.telefono));
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidTelefono(telefono: string): boolean {
    const telefonoRegex = /^[+]?[\d\s\-()]{9,}$/;
    return telefonoRegex.test(telefono);
  }
  /*
    areDiasInvalid(): boolean {
      return this.formSubmitted && this.formData.dias.length === 0;
    }
  
    toggleDia(dia: string) {
      const index = this.formData.dias.indexOf(dia);
      if (index > -1) {
        this.formData.dias.splice(index, 1);
      } else {
        this.formData.dias.push(dia);
      }
    }*/

  /*onSubmit() {
    this.formSubmitted = true;

    // Validar todos los campos obligatorios
    if (!this.isFormValid()) {
      alert('Por favor, completa todos los campos obligatorios correctamente.');
      return;
    }

    if (!this.formData.aceptoTerminos || !this.formData.aceptoPoliticaPrivacidad) {
      alert('Debes aceptar los términos y condiciones y la política de privacidad.');
      return;
    }

    console.log('Datos del formulario:', this.formData);
    alert('¡Solicitud enviada! Te contactaremos en breve.');

    this.router.navigate(['/']);
  }*/

  isFormValid(): boolean {
    return (
      this.formData.tipo !== '' &&
      this.formData.nombre !== '' &&
      this.formData.email !== '' &&
      this.isValidEmail(this.formData.email) &&
      this.formData.telefono !== '' &&
      this.isValidTelefono(this.formData.telefono) &&
      this.formData.documentoIdentidad !== '' &&
      this.formData.cobertura !== '' &&
      //this.formData.dias.length > 0 &&
      (this.formData.tipo !== 'prensa' || this.formData.medio !== '') &&
      this.formData.aceptoTerminos &&
      this.formData.aceptoPoliticaPrivacidad
    );
  }

  resetForm() {
    this.formData = {
      tipo: '',
      nombre: '',
      email: '',
      telefono: '',
      documentoIdentidad: '',
      ciudadResidencia: '',
      redesSociales: '',
      medio: '',
      plataformas: '',
      cobertura: '',
      necesidadesEspeciales: '',
      //dias: [],
      aceptoTerminos: false,
      aceptoPoliticaPrivacidad: false
    };
    this.formSubmitted = false;
  }
}