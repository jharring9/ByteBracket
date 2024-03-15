# ByteBracket

## Preliminary Setup

### `npm install`

Installs all the dependencies for the project.

## Build Scripts

### `npm run start`

_For development only._ Builds the app and runs a development server on port 8080. Creates a proxy to the production backend server to test against real data.

### `npm run build`

_For production only._ Bundles the webapp and outputs it to the `build` folder.

### `npm run tailwind`

Builds and minifies the tailwind css file. Not required for local development, as it is included in the `npm run start` command.
