# Interview Task (Currency Converter)

This is a simple currency converter component, created for an interview assignment. See [docs/breif.md](docs/brief.md) for the details of the assignment.

> Please read the ADRs located under `docs/...` for more info on tech and feature choices.
> 
> You can also view the commit history. Each commit has a relevant description, and the code was written from scratch (barring `chore(): initial angular cdk...`).

## Install

Clone the repo on the main branch and run `npm install`.

## Run 

### Stubbed API

To test the application without connection to Currency Beacon, just run it with `npm run start` or `ng serve`.

### Real API

To connect to the Currency Beacon API, you need to aquire an API key by [signing up at their site](https://currencybeacon.com/account/dashboard) and copying your 32 character `API Key`.

Paste your key in the `key` variable at the top of [the currency beacon service](src/services/currency-beacon.ts).

Save and run the app with `npm run start` or `ng serve`.

## Contact

For any queries, please contact the creator via email: `danielottojackpetersen2@gmail.com`.
