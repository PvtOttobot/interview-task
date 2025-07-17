# Basic tech choices (Angular)

## Status

accepted

## Context

To fulfil this project's goal, we need to create something from scratch, specifically a web app that can handle forms and API requests.

I can't go through every tech choice e.g., I'm using Windows, git, etc. But here are a few key decisions.

## Decision

The position is for an Angular developer, so I chose to use Angular, and I'll use the excellent built-in 'reactive forms' to handle form logic.

When setting up with the CLI, I chose the following:
```
✔ Do you want to create a 'zoneless' application without zone.js (Developer Preview)? No
✔ Which stylesheet format would you like to use? CSS
✔ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No
```

Zoneless and SSR are still too unstable and not worth the trouble for most apps, especially something this simple. I chose basic CSS, but I'll visit my styling strategy in a separate ADR. I'm going to ignore styles to begin with, as I'll be using HTML native, and Angular form behaviors which should be fairly portable if I later choose to grab a component library, or style library like Tailwind.

In general, I'm not worried about bundle size, speed, enterprise licencing, or security as I won't run into any perceivable issues with a project this small that will be thrown away. But best-practice, and informed tech choices are still in play here.

## Consequences

### Negative
- React would have made finding libraries easier.
  - Specifically can't use `react-number-format`.
- Not exploring the latest Angular concepts.

### Positive
- Can prove Angular expertise.
- The built-in 'reactive forms' state handling is perfect for a component like this.
- Stable features with lots material to inform best practice.
- Can release unstyled MVP version if out of time.
