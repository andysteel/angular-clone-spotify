import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { PlayerComponent } from './player/player.component';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';


@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRotas)
  ]
})
export class PlayerModule { }
