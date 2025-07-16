import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-currency-converter',
  imports: [],
  styles: `
    .c-currency-converter {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `,
  template: `
    <div class="c-currency-converter">
      <label [for]="selectLeftId">Label for left select</label>
      <select id>
        @for (currency of currencies; track currency.id) {
          <option>{{currency.name}}</option>
        }
      </select>

      <label [for]="selectRightId">Label for right select</label>
      <select>
        @for (currency of currencies; track currency.id) {
          <option>{{currency.name}}</option>
        }
      </select>

      <label [for]="inputLeftId">Label for left input</label>
      <input [id]="inputLeftId"/>

      <label [for]="inputRightId">Label for right input</label>
      <input [id]="inputRightId"/>
    </div>
  `,
})
export class CurrencyConverter {
  selectLeftId = uuidv4();
  selectRightId = uuidv4();
  inputLeftId = uuidv4();
  inputRightId = uuidv4();

  currencies = [{id: 0, name: 'USD'}, {id: 1, name: 'GBP'}];
}
