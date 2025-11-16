import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  errorMsg = '';
  showPassword = false;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(
    private fb: FormBuilder,
    private adminService: AdministradorService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    if (this.isBrowser) {
      const savedEmail = localStorage.getItem('mc_remember_email');
      if (savedEmail) {
        this.form.patchValue({ email: savedEmail, remember: true });
      }
    }
  }

  submit(): void {
    this.errorMsg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const firstInvalid = document.querySelector('.form-field.invalid input') as HTMLElement | null;
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    const { email, contrasena, remember } = this.form.value;
    this.loading = true;
    this.adminService.login(email, contrasena).subscribe({
      next: (admin) => {
        this.loading = false;
        if (this.isBrowser) {
          if (remember) {
            localStorage.setItem('mc_remember_email', email);
          } else {
            localStorage.removeItem('mc_remember_email');
          }
        }
        // Redirigir a una vista posterior al login
        this.router.navigateByUrl('/producto-administrador');
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.message || 'No fue posible iniciar sesión. Verifique sus datos.';
      }
    });
  }

  forgotPassword(): void {
    // Placeholder para futura funcionalidad de recuperación de contraseña
    alert('La recuperación de contraseña estará disponible pronto.');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    const pwd = document.getElementById('pwd') as HTMLInputElement | null;
    if (pwd) pwd.type = this.showPassword ? 'text' : 'password';
  }
}
