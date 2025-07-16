import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import currenciesJson from '../../test/currencies.json';
import convertJson from '../../test/convert.json';

export interface Currency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
}

export interface CurrencyResponse {
  response: Currency[];
}

export interface ConvertRequest {
  from: string;
  to: string;
  amount: number;
}

export interface ConvertResponse {
  response: {
    timestamp: number;
    date: string;
    from: string;
    to: string;
    amount: number;
    value: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyBeacon {
  httpClient = inject(HttpClient);
  root = 'https://api.currencybeacon.com/v1';
  key = 'fake-auth-key';

  getCurrencies(): Observable<CurrencyResponse> {
    if (!this.key || this.key === 'fake-auth-key') {
      // alert(
      //   'No authentication key supplied for CurrencyBeacon API, please check the README.md for setup instructions. Returning dummy response.',
      // );
      //TODO: change this log to an alert
      console.warn(
        'No authentication key supplied for CurrencyBeacon API, please check the README.md for setup instructions. Returning dummy response.',
      );
      const fakeResponse = new Subject<CurrencyResponse>();
      setTimeout(() => {
        fakeResponse.next(currenciesJson);
      }, 100);
      return fakeResponse.asObservable();
    } else {
      return this.httpClient.get<CurrencyResponse>(this.root + '/currencies', {
        headers: {
          Authorization: `Bearer ${this.key}`,
        },
      });
    }
  }

  getConvert(request: ConvertRequest): Observable<ConvertResponse> {
    if (!this.key || this.key === 'fake-auth-key') {
      // alert(
      //   'No authentication key supplied for CurrencyBeacon API, please check the README.md for setup instructions. Returning dummy response.',
      // );
      //TODO: change this log to an alert
      console.warn(
        'No authentication key supplied for CurrencyBeacon API, please check the README.md for setup instructions. Returning dummy response.',
      );
      const fakeResponse = new Subject<ConvertResponse>();
      setTimeout(() => {
        fakeResponse.next(convertJson);
      }, 100);
      return fakeResponse.asObservable();
    } else {
      return this.httpClient.get<ConvertResponse>(this.root + '/convert', {
        headers: {
          Authorization: `Bearer ${this.key}`,
        },
        params: {
          from: request.from,
          to: request.to,
          amount: request.amount,
        },
      });
    }
  }
}
