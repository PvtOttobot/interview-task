import { Component, inject } from '@angular/core';
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
    }
  `,
  template: `
    <form [formGroup]="form" class="c-currency-converter">
      <div class="c-currency-converter__from">
        <h2>From</h2>
        <select formControlName="leftSelect" aria-label="From currency">
          @for (currency of currenciesResponse()?.response; track currency.id) {
            <option>{{ currency.short_code }}</option>
          }
        </select>
        <input
          type="number"
          aria-label="From amount"
          [formControl]="form.controls.leftInput"
        />
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
        <select formControlName="rightSelect" aria-label="To currency">
          @for (currency of currenciesResponse()?.response; track currency.id) {
            <option>{{ currency.short_code }}</option>
          }
        </select>
        <input
          formControlName="rightInput"
          [readonly]="true"
          aria-label="To amount"
        />
      </div>
      <p>
        {{
          asString(
            form.controls.rightInput.value,
            form.controls.rightSelect.value
          )
        }}
      </p>
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
      return `${currency.symbol}${amount} (${currency.name})`;
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
