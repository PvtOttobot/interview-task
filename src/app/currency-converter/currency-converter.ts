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
    }

    .c-currency-converter {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 500px;
    }

    .c-currency-converter__from {
    }
    .c-currency-converter__to {
    }
  `,
  template: `
    <form [formGroup]="form" class="c-currency-converter">
      <div class="c-currency-converter__from">
        <h2>From</h2>
        <select [id]="selectLeftId" formControlName="leftSelect">
          @for (currency of currenciesResponse()?.response; track currency.id) {
            <option>{{ currency.short_code }}</option>
          }
        </select>

        <label [for]="inputLeftId" [hidden]="true">Amount</label>
        <input [id]="inputLeftId" [formControl]="form.controls.leftInput" />
        <label [for]="selectLeftId" [hidden]="true">Currency</label>
        <p>
          {{
            asString(
              form.controls.leftInput.value,
              form.controls.leftSelect.value
            )
          }}
        </p>
      </div>

      <div class="c-currency-converter__to">
        <h2>To</h2>
        <label [for]="selectRightId" [hidden]="true">Currency</label>
        <select [id]="selectRightId" formControlName="rightSelect">
          @for (currency of currenciesResponse()?.response; track currency.id) {
            <option>{{ currency.short_code }}</option>
          }
        </select>

        <label [for]="inputRightId" [hidden]="true">Amount</label>
        <input
          [id]="inputRightId"
          formControlName="rightInput"
          [readonly]="true"
        />
      </div>
      <p></p>
    </form>
  `,
})
export class CurrencyConverter {
  private currencyBeaconService: CurrencyBeacon = inject(CurrencyBeacon);
  currenciesResponse = toSignal(this.currencyBeaconService.getCurrencies());

  form = new FormGroup({
    leftSelect: new FormControl<string>(''),
    leftInput: new FormControl<string>('100'),
    rightSelect: new FormControl<string>(''),
    rightInput: new FormControl<string>('100'),
  });

  selectLeftId = uuidv4();
  selectRightId = uuidv4();
  inputLeftId = uuidv4();
  inputRightId = uuidv4();

  updateConversion = () => {
    this.currencyBeaconService
      .getConvert({
        from: this.form.controls.leftSelect.value || '',
        to: this.form.controls.rightSelect.value || '',
        amount: parseFloat(this.form.controls.leftInput.value || '0.00'),
      })
      .subscribe((value) => {
        this.form.controls.rightInput.patchValue(
          value.response.value.toString(),
        );
      });
  };

  asString = (amount: string | null, shortCode: string | null) => {
    const currency = this.currenciesResponse()?.response.find((currency) => {
      return currency.short_code === shortCode;
    });
    if (currency) {
      return `${currency.symbol} ${shortCode}`;
    } else {
      return 'No currency selected';
    }
  };

  constructor() {
    this.form.controls.leftSelect.valueChanges.subscribe(this.updateConversion);
    this.form.controls.rightSelect.valueChanges.subscribe(
      this.updateConversion,
    );
    this.form.controls.leftInput.valueChanges.subscribe(this.updateConversion);
  }
}
