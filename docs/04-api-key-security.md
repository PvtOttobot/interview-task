# Security & Stubbing (API Key)

## Status

accepted

## Context

To access the Currency Beacon API, we need to send an API key along with our requests. I don't want to commit this to Github for security reasons. Someone could use up all my remaining credits, or commit a crime using my account.

## Decision

I've created a stubs system with `test/*.json` files that I copied from API responses. By default, the app will use these responses.

You can call the real api by pasting the key in the service:

> To connect to the Currency Beacon API, you need to aquire an API key by [signing up at their site](https://currencybeacon.com/account/dashboard) and copying your 32 character `API Key`.
>
> Paste your key in the `key` variable at the top of [the currency beacon service](src/services/currency-beacon.ts).
>
> Save and run the app with `npm run start` or `ng serve`.``

## Consequences

### Negative

- Not a solution for any builds of the app which can't edit the source.
- Risk of accidentally commiting the key after pasting it while testing.
- Evaluator needs to procure their own key.

### Positive

- Stub system reduces my API calls while developing.
- Secure.
- Easy to paste in the key when needed.
- Stubs are fast and offline.
