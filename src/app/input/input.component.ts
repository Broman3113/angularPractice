import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngp-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent {
  @Input() value?: string;
  @Input() placeholder?: string;
  @Input() disabled?: boolean;
  @Input() required?: boolean;
  @Input() type?: string;
  @Input() maxLength?: number;

  onInput(event: Event) {
    if (event.target && (event.target as HTMLInputElement).value) {
      this.value = (event.target as HTMLInputElement).value;
    }
  }
}
