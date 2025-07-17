# Code style

## Status

accepted

## Context

The repo needs to be maintained stylistically and semantically, same with the git history, but a new Angular project doesn't install prettier, eslint, or commit checks by default.

## Decision

I'm prioritizing speed and leaning on my experience of stylistic best practices aka I'm not installing Eslint or any other semantic checker. However, line-endings are extremely frustrating to do by hand, so I installed prettier and set it to format on save.

I should be able to produce clear code for any evaluators with this setup.

## Consequences

### Negative

- Risk of lapsing on style and git history since unchecked.
- Have to fix some errors manually with no eslint, lose time.

### Positive

- I'm a solo dev on this project so consistency isn't an issue.
- I have more time to develop.
- Prettier cleans up automatically on save.
