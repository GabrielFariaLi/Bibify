import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.scss'],
})
export class BotaoMenuComponent {
  @Input()
  descricao: string | undefined = 'bibi';
  @Input()
  selecionado: boolean | undefined = false;

  @Output()
  click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
