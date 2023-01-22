import { Component } from '@angular/core';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss'],
})
export class BuscasRecentesComponent {
  pesquisasRecentes = [
    'Top Brasil',
    'Top Global',
    'Rock',
    'Metal',
    'Funk Hits',
    'Kpop',
  ];
  campoPesquisa = '';

  definirPesquisa(pesquisa: string) {
    this.campoPesquisa = pesquisa;
  }

  buscar() {
    console.log('buscando');
  }
}
