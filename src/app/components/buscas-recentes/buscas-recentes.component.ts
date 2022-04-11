import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit {

  pesquisasRecentes: string[] = ['Hard n Heavy', 'Porradas Metal', 'Nightwish'];
  campoPesquisa = '';

  constructor() { }

  ngOnInit(): void {
  }

  definirPesquisa(pesquisa: string) {
    this.campoPesquisa = pesquisa;
    document.querySelector<HTMLInputElement>("#inputCampoPesquisa").focus();
  }

  buscar() {
    console.log("buscanco ...", this.campoPesquisa)
  }
}
