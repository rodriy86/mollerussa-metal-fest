//import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { configGlobal } from '../configGlobal';
import { RouterModule } from '@angular/router';
//import { FormAcreditacioComponent } from '../form-acreditacio-component/form-acreditacio-component';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './info-component.html',
  styleUrl: './info-component.html',
})
export class InfoComponent {
  configGlobal = configGlobal;

  buyTicket(type: string, price: number) {
    console.log(`Comprando entrada ${type} por ${price}€`);
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