import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { MainComponent } from './app/components/main/main.component';
import { VehiculosComponent } from './app/components/vehiculos/vehiculos.component';
import { authGuard } from './app/guards/auth.guards';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter([
      { path: '', component: LoginComponent },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [authGuard],
      },
      {
        path: 'vehiculos',
        component: VehiculosComponent,
        canActivate: [authGuard],
      },
    ]), provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
