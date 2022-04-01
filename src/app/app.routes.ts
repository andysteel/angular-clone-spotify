import { Routes } from "@angular/router";
import { AutenticadoGuard } from "./guards/autenticado.guard";

export const AppRotas: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(r => r.LoginModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(r => r.PlayerModule),
    canLoad: [AutenticadoGuard]
  }
]
