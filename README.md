# fivem-typescript-boilerplate

A boilerplate for creating FiveM resources with TypeScript.

## Features

- **Frontend**: Vue 3 + Vuetify 3 + TypeScript + Axiom
- **Backend**: TypeScript with FiveM natives
- **Shared**: Type-safe communication between client/server/UI
- **Database**: OxMySQL integration ready
- **Hot Reload**: Development mode for UI with Vite

## Project Structure

```
stockmarket/
├── client/          # Client-side FiveM scripts
│   ├── client.ts    # Main client initialization
│   ├── callbacks.ts # NUI callbacks and commands
│   ├── events.ts    # Client event handlers
│   └── utils.ts     # Client utility functions
├── server/          # Server-side FiveM scripts
│   ├── server.ts    # Main server initialization
│   ├── callbacks.ts # Server callbacks
│   ├── events.ts    # Server event handlers
│   ├── db.ts        # Database utilities
│   └── utils.ts     # Server utility functions
├── shared/          # Shared types and config
│   ├── types.ts     # Shared TypeScript types
│   ├── enums.ts     # Shared enumerations
│   ├── config.ts    # Shared configuration
│   └── index.ts     # Shared exports
├── html/            # Vue 3 UI
│   ├── src/
│   │   ├── components/  # Vue components
│   │   ├── pages/       # Vue pages (auto-routed)
│   │   ├── composables/ # Vue composables
│   │   ├── utils/       # UI utilities
│   │   ├── plugins/     # Vue plugins
│   │   └── router/      # Vue router
│   └── package.json
└── fxmanifest.lua   # FiveM resource manifest
```

## Installation

1. **Clone/Download** this resource to your FiveM server's resources folder

2. **Install root dependencies**:
   ```bash
   yarn install
   ```

3. **Install UI dependencies**:
   ```bash
   cd html
   yarn install
   ```

4. **Build the resource**:
   ```bash
   yarn build
   ```

5. **Add to server.cfg**:
   ```
   ensure stockmarket
   ```

## Development

Use `pnpm watch` to actively rebuild modified files while developing the resource.

During web development, use `pnpm web:dev` to start vite's webserver and watch for changes.

## Build

Use `pnpm build` to build all project files in production mode.

To build and create GitHub releases, tag your commit (e.g. `v1.0.0`) and push it.

## Layout

- [/dist/](dist)
  - Compiled project files.
- [/locales/](locales)
  - JSON files used for translations with [ox_lib](https://overextended.dev/ox_lib/Modules/Locale/Shared).
- [/scripts/](scripts)
  - Scripts used in the development process, but not part of the compiled resource.
- [/src/](src)
  - Project source code.
- [/static/](static)
  - Files to include with the resource that aren't compiled or loaded (e.g. config).
