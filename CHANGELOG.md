# lindas-cube-validator Changelog

**Repository:** SwissFederalArchives/lindas-cube-validator
**Description:** LINDAS Cube Validator - Angular application for validating RDF Data Cubes

---

## December 2025

### 2025-12-17

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
