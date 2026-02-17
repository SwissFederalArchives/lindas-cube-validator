# lindas-cube-validator Changelog

**Repository:** SwissFederalArchives/lindas-cube-validator
**Description:** LINDAS Cube Validator - Angular application for validating RDF Data Cubes

---

## February 2026

### 2026-02-17

**Standardize Docker image tag naming**
- Changed CI tag format from `branch-main-YYYYMMDDHHmmss` to `test_YYYY-MM-DD_HHmmss`
- Updated promote/rollback workflow to use `test_*` tags for TEST rollback
- Aligned with naming convention used across all LINDAS services

### 2026-02-16

**Fix all 22 failing unit tests**
- Fixed 20 spec files that were never updated for the actual component implementations
- Added missing providers: ActivatedRoute (provideRouter), HttpClient (provideHttpClientTesting), TranslateModule, ObSpinnerService
- Set required Angular signal inputs (input.required) before detectChanges()
- Added CUSTOM_ELEMENTS_SCHEMA for Oblique components
- All tests now pass: 22 of 22 SUCCESS

### 2026-02-15

**Add promote/rollback workflow**
- Added `promote.yaml` workflow via `workflow_dispatch`
  - Action dropdown: promote, rollback-test, rollback-int, rollback-prod
  - Promote: retags source image as `int_YYYY-MM-DD_HHMMSS` then `prod_YYYY-MM-DD_HHMMSS`
  - Rollback: retags a previous image with a new timestamp so Flux picks it up
  - Uses `docker buildx imagetools create` for zero-layer-pull retagging (no rebuild)

---

## December 2025

### 2025-12-17

**Fix console warnings in cube-validator**
- Fixed NG0956 track by identity warning by using proper track expression in @for loops
- Removed deprecated `allowSignalWrites` flag from effect() calls (no longer needed in Angular 19)
- Replaced `string-to-stream` package with browser-compatible implementation using `stream-browserify`
- Reduced util module externalization warnings from 4 to 1 (remaining from deep transitive dependency)

**Fix TypeScript type error with @lindas/formats-lazy**
- Fixed TS2345 type error in rdf-environment.ts when importing formats
- Root cause: malformed type declarations in @lindas/formats-lazy index.d.ts
- The SinkMap generics were using invalid `import("events")<[never]>` syntax
- Fixed by correcting types to use proper `EventEmitter` and `Stream` from @rdfjs/types
- Removed unnecessary `as any` type cast in cube-validator code

**Fix mat-form-field height for proper text display**
- Angular Material MDC form fields had insufficient height causing input text to be clipped
- Added CSS overrides for min-height, padding, and line-height in validator-input.component.scss
- Added same CSS fixes to profile-selector.component.scss for validation profile dropdown
- Ensures SPARQL endpoint URL, validation profile dropdown, and other inputs display properly

**Fix WINDOW InjectionToken provider for Oblique 13**
- Fixed runtime error: "NullInjectorError: No provider for InjectionToken Window"
- Added explicit WINDOW token provider in app.module.ts
- Breaking change in Oblique 13: modules no longer provide WINDOW token automatically
- The WINDOW token is now manually provided using a factory function

**Clean up RDF environment configuration**
- Removed unused @rdfjs/formats import that was causing issues
- Simplified rdf-environment.ts to use base formats from @lindas/env

**Fix TypeError in RDF environment initialization (RESOLVED)**
- Fixed "TypeError: Cannot convert undefined or null to object at Object.getPrototypeOf"
- Root cause: @sec-ant/readable-stream (transitive dependency from get-stream v9) uses
  async generator patterns incompatible with Angular's esbuild bundler
- Solution: Added npm override in package.json to force get-stream ^8.0.0
- Also added comprehensive proxy traps to @lindas/env-core extend() function for robustness

**Replace @rdfjs-elements/formats-pretty with @lindas/formats-lazy**
- @rdfjs-elements/formats-pretty depends on @graphy/* packages that require Node.js crypto
- Created and use @lindas/formats-lazy (fork of @zazuko/formats-lazy) which is browser-compatible
- This fixes "Failed to parse response" errors by properly registering RDF parsers

### 2025-12-11

**`c3b64ec` - Fix import paths and async playground link handling for @lindas packages**
- Fixed import paths for @lindas scoped packages
- Fixed async playground link handling

### 2025-12-10

**`47f150d` - Regenerate package-lock.json for @lindas packages**
- Updated lockfile for new package names

**`bebf934` - Regenerate package-lock.json for @lindas packages**
- Additional lockfile updates

### 2025-12-08

**`fb59f8c` - Fix @lindas package versions to match published versions**
- Aligned package versions with npm registry

**`ac60a79` - Update @zazuko dependencies to @lindas packages**
- Migrated from @zazuko to @lindas packages:
  - @zazuko/shacl-test -> @lindas/shacl-test

### 2025-12-04

**`9a6f1ce` - Upgrade to Angular 19 and Oblique 13**
- Major framework upgrade to Angular 19
- Upgraded Oblique UI framework to version 13

---

## 2024

### July 2024

**`d376e91` - Create the search field for all languages**
- Added multilingual search functionality

**`a600859` - Rename default profile to basic**
- Renamed default validation profile

**`cbe328b` - search all lang and lowercase and trim**
- Improved search to be case-insensitive
- Search across all languages

### June 2024

**`2ec35f0` - Adjust table font**
- Adjusted table font sizes

**`6546046` - Use oblique table with css adjustments**
- Implemented Oblique table styling

**`740d8e8` - Add link and cli command**
- Added playground link and CLI command display

**`d77e0c9` - Make reports more clear and filter details in cube**
- Improved report clarity
- Added detail filtering

**`114d5a6` - Provide a way to define a profile url manually**
- Added manual profile URL input

### May 2024

**`1c1d8c4` - Close #7**
- Bug fix for issue #7

**`a0216f9` - Fix language in cube view**
- Fixed language display issues

---

## Summary

### Package Migration
- Migrated from @zazuko/shacl-test to @lindas/shacl-test

### Framework Upgrades
- Angular 17 -> 19
- Oblique 12 -> 13

### Features
- Multilingual search
- Manual profile URL input
- Improved validation reports
- CLI command display

---

*Last updated: 2025-12-17*
