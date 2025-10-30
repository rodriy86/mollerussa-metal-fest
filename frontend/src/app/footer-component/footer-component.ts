import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { configGlobal } from '../configGlobal';
import { RouterModule, Router } from '@angular/router';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss'
})
export class FooterComponent {
 configGlobal=configGlobal;

 constructor(private router: Router) {}
 
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  navegarAFormulario() {
    this.router.navigate(['/form-acreditacio']);
  }
}