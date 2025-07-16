import { Component, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyBeacon } from '../../services/currency-beacon';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  imports: [ReactiveFormsModule],
  providers: [CurrencyBeacon],
  styles: `
    .c-currency-converter {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 500px;
    }
  `,
  template: `
    <form [formGroup]="form" class="c-currency-converter">
      <label [for]="selectLeftId">Label for left select</label>
      <select [id]="selectLeftId" formControlName="leftSelect">
        @for (currency of currenciesResponse()?.response; track currency.id) {
          <option>{{ currency.short_code }}</option>
        }
      </select>

      <label [for]="inputLeftId">Label for left input</label>
      <input [id]="inputLeftId" formControlName="leftInput" />

      <label [for]="selectRightId">Label for right select</label>
      <select [id]="selectRightId" formControlName="rightSelect">
        @for (currency of currenciesResponse()?.response; track currency.id) {
          <option>{{ currency.short_code }}</option>
        }
      </select>

      <label [for]="inputRightId">Label for right input</label>
      <input [id]="inputRightId" formControlName="rightInput" />
    </form>
  `,
})
export class CurrencyConverter {
  private currencyBeaconService: CurrencyBeacon = inject(CurrencyBeacon);
  currenciesResponse = toSignal(this.currencyBeaconService.getCurrencies());

  form = new FormGroup({
    leftSelect: new FormControl(''),
    leftInput: new FormControl('100'),
    rightSelect: new FormControl(''),
    rightInput: new FormControl('100'),
  });

  selectLeftId = uuidv4();
  selectRightId = uuidv4();
  inputLeftId = uuidv4();
  inputRightId = uuidv4();

  updateConversion = () => {
    const convertResponse = this.currencyBeaconService
      .getConvert({
        from: this.form.controls.leftSelect.value || '',
        to: this.form.controls.rightSelect.value || '',
        amount: parseFloat(this.form.controls.leftInput.value || '0.00'),
      })
      .subscribe((value) => {
        this.form.controls.rightInput.patchValue(
          value.response.value.toString() || null,
        );
      });
  };

  constructor() {
    this.form.controls.leftSelect.valueChanges.subscribe(this.updateConversion);
    this.form.controls.rightSelect.valueChanges.subscribe(
      this.updateConversion,
    );
    this.form.controls.leftInput.valueChanges.subscribe(this.updateConversion);
  }
}
