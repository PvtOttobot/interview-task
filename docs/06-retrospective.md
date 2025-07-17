# Retro and stretch goals

## Status

proposed

## Context

While this app is a small feature, there's always room for refinement, and sub-features that don't make it. I'm writing this after finishing the code. Currently, the app looks unstyled and supports one-way currency conversion. It's functional, accessible, and using best practice, so it would be easy to work on it in the future.

I want to document the features that I left on the cutting room floor while developing, and any features I would implement if I had more time.

## Decision

### Testing

While Angular created default spec files for my component and my service, I didn't have time to fill these in. I do consider testing a priority, and a requirement before publishing anything to prod. However, I decided to leave tests out of this MVP. Below is my proposed suite.

#### Unit

**Jest**, 100% coverage on the service and the component. While Karma/Jasmine can be better for browser simulation, I find jest much more competent for unit testing logic, and checking coverage.

We could also use **Stryker** for mutation testing on our Jest tests, but I wouldn't recommend that for this small project. Mutation takes a long time to run and only bolsters your unit tests, which are already a small part of the picture in this app. It might be worth installing and running once, to make the dev more aware of why mutants survive in their tests.

#### Component

I like to include **Storybook** in almost every project as it's important to test each component in isolation. The time spent installing / maintaining is less than the time gained back even from debugging, never mind if the Storybook is published for users.

#### Visual regression

I think visual regression is overkill for this project, but we could use Storybook's **Chromatic** to cover this in a larger project, or a library.

#### End to end

We can utilize a Storybook tool again here. I would create a **Vitest** suite with a couple of tests running end to end on the stubbed API.

### Visual style

I opted for vanilla CSS when setting up the project, to stick with simple native functionality (organised using BEM classes) which I used where some layout was needed. But I left fonts, colours, text, and the form fields styled as default so I could focus on the brief.

I originally planned to replace the native HTML `selects` and `input` with equivalents from a component library, but had trouble integrating `spartan-ng`.

If I had more time I would still leave `spartan-ng` and for this small project I would choose a non-default font, create a quick two-tone color system, and continue adding BEM classes with vanilla CSS to get it looking more user-friendly.

### Form features

The brief is satisfied with my current implementation, but I would have preferred to implement dynamic two-way conversion or at least a button to swap the To and From values. I don't see any issues adding this later leveraging reactive forms. For now, the To value is `readonly`.

The native select dropdowns aren't too easy to use with a mouse, especially for selecting those small strings from a large list. I would like to augment this, most likely through an unstyled library, but there may some difficulty, considering my experience with `spartan-ng`. I'd like to try `radix-ng`, the angular equivalent to the excellent `radix` (the backbone behind `shadcn`).

The From `input` is of `type='number'` which is a quick way to restrict the type-able characters. But it's not robust, it blocks symbols e.g. the comma, which is used by some currencies as their decimal point. A better solution is to use `type='text'` and restrict the input yourself. We'd also want dynamic formatting. All of this is not worth building in a small project, but in React I would use the `react-number-format` library which handles these features gracefully. I would have liked to try out some equivalents in Angular, but I'm yet to find one; if not for the Angular job that this project is for, I would have built the entire thing around `react-number-format`, that's how excellent the package is.

## Consequences

### Negative

- Not as visually polished as it could be with more time.
- Could have more optional features. 

### Positive

- Able to submit the project.
- Managing scope creep is an important skill.
- Best practice and from-scratch code with few bad smells means almost everything is easily extensible at a later date. 
