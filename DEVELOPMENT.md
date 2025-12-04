# LINDAS Cube Validator - Development Guide

The **LINDAS Cube Validator** is an Angular application designed to validate RDF cubes against SHACL shapes. It ensures that data cubes conform to the [Cube Link](https://cube.link/) specifications and other defined constraints.

## Overview

The validator connects to a SPARQL endpoint (like Fuseki), fetches available cubes, and validates them using SHACL shapes. It provides a user-friendly interface to select cubes, run validations, and view detailed reports on any violations.

## Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Included with Node.js
- **Angular CLI** (optional): `npm install -g @angular/cli`
- **Docker** (for containerized development)

## Installation

1. Navigate to the project directory:
   ```bash
   cd lindas-cube-validator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

### 1. Start the Local Environment
Before running the validator, ensure you have a SPARQL endpoint running. The `local-setup` project provides a pre-configured environment.

From the root of the `lindas-local-environment` repository:

```bash
# Start the local environment (Fuseki, etc.)
cd local-setup
docker compose up -d fuseki
```

**Tip:** To have some data to validate, load the sample cubes:
```bash
# Windows
./load-data.ps1

# Linux/macOS
./load-data.sh
```

### 2. Configure Environment
The application uses environment files in `src/environments/`. For local development, you can use `environment.local.ts` (create it if it doesn't exist) or modify `environment.ts`.

**Key Configurations:**
- `sparqlEndpoint`: URL of the SPARQL endpoint (e.g., `http://localhost:3030/lindas/query`)

### 3. Start the Development Server
Run the application in development mode:

```bash
npm start
# OR
ng serve
```

Access the application at `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running with Docker

You can run the validator inside a Docker container while still enabling hot-reload for development.

### Using Docker Compose (Recommended)

The `local-setup` directory contains a `docker-compose.dev.yml` file configured for local development.

1. Navigate to `local-setup`:
   ```bash
   cd local-setup
   ```

2. Start the validator service:
   ```bash
   # Windows (PowerShell)
   ./scripts/start-cube-validator-dev.ps1

   # Linux/macOS
   ./scripts/start-cube-validator-dev.sh
   ```

   Or manually:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d cube-validator
   ```

3. Access the validator at `http://localhost:8082/`.

### Dockerfile.dev
The `Dockerfile.dev` is used for development. It mounts the source code into the container, allowing you to edit files locally and see changes immediately.

## Building for Production

To build the project for production:

```bash
npm run build
# OR
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Running Tests

Execute the unit tests via [Karma](https://karma-runner.github.io):

```bash
npm test
# OR
ng test
```

## Using the Validator

1. **Open the Application**: Go to `http://localhost:4200` (local) or `http://localhost:8082` (Docker).
2. **Select Endpoint**: Enter the SPARQL endpoint URL (e.g., `http://localhost:3030/lindas/query`).
3. **Choose a Cube**: The application will list available cubes from the endpoint. Select one to validate.
4. **View Report**: The validator will check the cube against SHACL shapes and display a report.
   - **Green**: Conforms to shapes.
   - **Red**: Violations found. Click to expand details.

## Integration with SHACL Shapes

The validator uses SHACL shapes from the `lindas-cube-link` package. In the local development environment, these shapes are mounted from the local `lindas-cube-link` directory, allowing you to test changes to shapes alongside the validator.

- **Shape Location**: `../lindas-cube-link/validation/`
- **Mount Point (Docker)**: `/app/cube-link-shapes`

## Debugging

- **Browser Console**: Check the browser's developer console (F12) for JavaScript errors and network requests.
- **Network Tab**: Inspect SPARQL queries sent to the endpoint.
- **Docker Logs**: View container logs:
  ```bash
  docker logs -f cube-validator-dev
  ```

## Adding Custom Shapes

To test custom SHACL shapes:
1. Add your `.ttl` shape file to `lindas-cube-link/validation/`.
2. Ensure the shape targets the correct class or node (e.g., `sh:targetClass cube:Observation`).
3. Restart the validation process in the UI.