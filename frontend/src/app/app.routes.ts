import { Routes } from '@angular/router';
import { IniciComponent } from './inici-component/inici-component';
import { DetalleNoticiaComponent } from './detalle-noticia-component/detalle-noticia-component'
import { DetalleGaleriaComponent } from './detalle-galeria-component/detalle-galeria-component';
import { DetalleBandaComponent } from './detalle-banda-component/detalle-banda-component';
import { FormAcreditacioComponent } from './form-acreditacio-component/form-acreditacio-component';
import { FormDinarComponent } from './form-dinar-component/form-dinar-component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  // === RUTAS PÚBLICAS === (Todos pueden acceder)
  { path: '', component: IniciComponent },
  { path: 'noticia/:id', component: DetalleNoticiaComponent },
  { path: 'detalle-galeria', component: DetalleGaleriaComponent },
  { path: 'banda/:id', component: DetalleBandaComponent },
  { path: 'comida-solidaria', component: FormDinarComponent },

  // === RUTA DE LOGIN ===
  { 
    path: 'login', 
    loadComponent: () => import('./login-component/login-component').then(m => m.LoginComponent) 
  },

  // === RUTAS PROTEGIDAS === (Solo usuarios logueados)
  { 
    path: 'form-acreditacio', 
    component: FormAcreditacioComponent,
    canActivate: [authGuard]  // ← Solo usuarios autenticados
  },

  // === RUTA DE FALLBACK ===
  { path: '**', redirectTo: '' }  
];

/*import { Routes } from '@angular/router';
import { IniciComponent } from './inici-component/inici-component';
import { DetalleNoticiaComponent } from './detalle-noticia-component/detalle-noticia-component'
import { DetalleGaleriaComponent } from './detalle-galeria-component/detalle-galeria-component';
import { DetalleBandaComponent } from './detalle-banda-component/detalle-banda-component';
import { FormAcreditacioComponent } from './form-acreditacio-component/form-acreditacio-component';
import { FormDinarComponent } from './form-dinar-component/form-dinar-component';
import { authGuard } from './services/auth.guard';
import { roleGuard } from './services/role.guard';

export const routes: Routes = [
  // === RUTAS PÚBLICAS === (Todos los usuarios: anónimos, logueados, editores, admin)
  { path: '', component: IniciComponent },
  { path: 'noticia/:id', component: DetalleNoticiaComponent },
  { path: 'detalle-galeria', component: DetalleGaleriaComponent },
  { path: 'banda/:id', component: DetalleBandaComponent },
  { path: 'comida-solidaria', component: FormDinarComponent },

  // === RUTA DE LOGIN ===
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) 
  },

  // === RUTAS DE USUARIO LOGUEADO === (Solo usuarios autenticados - para formularios, etc.)
  { 
    path: 'form-acreditacio', 
    component: FormAcreditacioComponent,
    canActivate: [authGuard]  // ← Cualquier usuario logueado (incluye editor y admin)
  },
  { 
    path: 'mi-perfil', 
    loadComponent: () => import('./components/mi-perfil/mi-perfil.component').then(m => m.MiPerfilComponent),
    canActivate: [authGuard]  // ← Cualquier usuario logueado
  },

  // === RUTAS DE EDITOR === (Puede editar noticias + acceso a toda la web)
  { 
    path: 'editor/noticias', 
    loadComponent: () => import('./components/editor/noticias/editor-noticias.component').then(m => m.EditorNoticiasComponent),
    canActivate: [authGuard, roleGuard('editor')]  // ← Solo editores y admin
  },
  { 
    path: 'editor/noticias/nueva', 
    loadComponent: () => import('./components/editor/nueva-noticia/editor-nueva-noticia.component').then(m => m.EditorNuevaNoticiaComponent),
    canActivate: [authGuard, roleGuard('editor')]  // ← Solo editores y admin
  },
  { 
    path: 'editor/noticias/editar/:id', 
    loadComponent: () => import('./components/editor/editar-noticia/editor-editar-noticia.component').then(m => m.EditorEditarNoticiaComponent),
    canActivate: [authGuard, roleGuard('editor')]  // ← Solo editores y admin
  },

  // === RUTAS DE ADMIN === (Acceso total - puede hacer de todo)
  { 
    path: 'admin', 
    loadComponent: () => import('./components/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard, roleGuard('admin')]  // ← Solo admin
  },
  { 
    path: 'admin/usuarios', 
    loadComponent: () => import('./components/admin/usuarios/admin-usuarios.component').then(m => m.AdminUsuariosComponent),
    canActivate: [authGuard, roleGuard('admin')]  // ← Solo admin
  },
  { 
    path: 'admin/configuracion', 
    loadComponent: () => import('./components/admin/configuracion/admin-configuracion.component').then(m => m.AdminConfiguracionComponent),
    canActivate: [authGuard, roleGuard('admin')]  // ← Solo admin
  },
  { 
    path: 'admin/bands', 
    loadComponent: () => import('./components/admin/bands/admin-bands.component').then(m => m.AdminBandsComponent),
    canActivate: [authGuard, roleGuard('admin')]  // ← Solo admin
  },
  { 
    path: 'admin/galeria', 
    loadComponent: () => import('./components/admin/galeria/admin-galeria.component').then(m => m.AdminGaleriaComponent),
    canActivate: [authGuard, roleGuard('admin')]  // ← Solo admin
  },
  { 
    path: 'admin/acreditaciones', 
    loadComponent: () => import('./components/admin/acreditaciones/admin-acreditaciones.component').then(m => m.AdminAcreditacionesComponent),
    canActivate: [authGuard, roleGuard('admin')]  // ← Solo admin
  },

  // === RUTA DE FALLBACK ===
  { path: '**', redirectTo: '' }  
];*/