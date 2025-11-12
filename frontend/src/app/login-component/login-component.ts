import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '../pipes/translate.pipe';
import { AuthService } from '../services/auth.service';
import { configGlobal } from '../configGlobal';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  templateUrl: './login-component.html'
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  isLoading = false;
  showError = false;
  errorMessage = '';
  configGlobal = configGlobal;

  ngOnInit() {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      this.loginData.email = savedEmail;
      this.loginData.rememberMe = true;
    }
  }

  onSubmit() {
    if (!this.isFormValid()) {
      return;
    }

    this.isLoading = true;
    this.showError = false;

    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          if (this.loginData.rememberMe) {
            localStorage.setItem('rememberedEmail', this.loginData.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          this.router.navigate(['/admin']);
        } else {
          this.showError = true;
          this.errorMessage = response.message || 'ERRORES.CREDENCIALES_INVALIDAS';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.showError = true;
        this.errorMessage = 'ERRORES.CONEXION_SERVIDOR';
        console.error('Error en login:', error);
      }
    });
  }

  isFormValid(): boolean {
    return this.loginData.email.trim() !== '' && 
           this.loginData.password.trim() !== '' &&
           this.isValidEmail(this.loginData.email);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  volverAInicio() {
    this.router.navigate(['/']);
  }
}