//import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { configGlobal } from '../configGlobal';
import { RouterModule, Router } from '@angular/router';
import { TranslatePipe } from '../pipes/translate.pipe';
import { AuthService } from '../services/auth.service';
//import { FormAcreditacioComponent } from '../form-acreditacio-component/form-acreditacio-component';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './info-component.html',
  styleUrl: './info-component.html',
})
export class InfoComponent {
  configGlobal = configGlobal;


  private router = inject(Router);
  authService = inject(AuthService);
  public window = window;

  buyTicket(type: string, price: number) {
    console.log(`Comprando entrada ${type} por ${price}€`);
  }
  navegarAFormulario() {
    this.router.navigate(['/form-acreditacio']);
  }
  comprarEntrada() {
  // Esto abrirá en la MISMA ventana
  //window.location.href = 'https://entradium.com/events/mollerussa-metal-fest-2026-mollerussa';
    window.location.href = this.configGlobal.tickets.urlTikets;
}
  /*
    openPrensaModal() {
      console.log('🎯 Botón clickeado - llamando a openModal()');
      if (this.prensaModal) {
        console.log('✅ prensaModal encontrado');
        this.prensaModal.openModal();
      } else {
        console.log('❌ prensaModal es undefined');
      }
    }*/
  /*
    testClick() {
      console.log('🎯 testClick() EJECUTADO - El botón funciona');
      
      if (this.prensaModal) {
        console.log('✅ prensaModal encontrado, llamando openModal()');
        this.prensaModal.openModal();
      } else {
        console.log('❌ prensaModal es undefined');
      }
    }*/
}