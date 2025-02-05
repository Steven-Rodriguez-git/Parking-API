import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { MainComponent } from './app/components/main/main.component';
import { VehiculosComponent } from './app/components/vehiculos/vehiculos.component';
import { authGuard } from './app/guards/auth.guards';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: LoginComponent },
      {
        path: 'dashboard',
        component: MainComponent,
        canActivate: [authGuard],
      },
      {
        path: 'vehiculos',
        component: VehiculosComponent,
        canActivate: [authGuard],
      },
    ]),
  ],
}).catch((err) => console.error(err));
