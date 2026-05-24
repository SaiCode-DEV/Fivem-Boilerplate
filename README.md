# FiveM TypeScript Boilerplate

A modern FiveM resource boilerplate featuring TypeScript, Vue 3, Vuetify, and a robust build system with hot reload support.

## Features

- 🚀 **TypeScript** - Full TypeScript support for client, server, and web
- 🎨 **Vue 3 + Vuetify** - Modern UI framework with Material Design components
- 🔄 **Hot Reload** - Watch mode for rapid development
- 📦 **ESBuild** - Lightning-fast builds
- 🌍 **Localization** - Built-in i18n support
- 🗄️ **Database Migrations** - Structured database migration system
- 🎯 **Type Safety** - End-to-end type safety across client, server, and UI

## Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher)
- [Yarn](https://yarnpkg.com/) package manager
- FiveM Server (Build 13068 or higher)
- OneSync enabled on your server

## Installation

1. Clone or download this resource to your FiveM server's `resources` folder

2. Navigate to the resource directory:

```bash
cd resources/[standalone]/stockmarket
```

3. Install dependencies:

```bash
yarn install
```

## Development

### Watch Mode (Development)

For active development with automatic rebuilds:

```bash
yarn watch
```

This will:

- Watch for changes in TypeScript files
- Automatically rebuild on file changes
- Watch and rebuild the Vue/Vite web UI

### Web UI Development

To develop the UI with Vite's dev server and HMR:

```bash
yarn web:dev
```

Access the UI at `http://localhost:5173` (or the port shown in console)

## Building for Production

Build the resource for production:

```bash
yarn build
```

This will:

- Compile all TypeScript code (client/server)
- Bundle and minify the web UI
- Generate the `fxmanifest.lua`
- Output compiled files to the `dist` folder

## Project Structure

```
/
├── src/
│   ├── client/          # Client-side TypeScript code
│   ├── server/          # Server-side TypeScript code
│   │   └── migrations/  # Database migration files
│   └── common/          # Shared code between client/server
│       ├── config.ts    # Configuration loader
│       └── utils.ts     # Common utilities
├── web/
│   ├── src/
│   │   ├── components/  # Vue components
│   │   ├── pages/       # Vue pages (file-based routing)
│   │   ├── composables/ # Vue composables
│   │   ├── utils/       # Web utilities
│   │   └── plugins/     # Vue plugins (Vuetify, etc.)
│   └── public/          # Static assets
├── static/
│   └── config.json      # Runtime configuration
├── scripts/
│   ├── build.js         # Build configuration
│   └── utils.js         # Build utilities
└── dist/                # Compiled output (generated)
    ├── client.js
    ├── server.js
    └── web/
```

## Available Scripts

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `yarn install` | Install dependencies                     |
| `yarn build`   | Build for production                     |
| `yarn watch`   | Development mode with auto-rebuild       |
| `yarn web:dev` | Start Vite dev server for UI development |
| `yarn format`  | Format code with Biome and ESLint        |
| `yarn lint`    | Lint code with Biome and ESLint          |

## Configuration

### Static Configuration

Edit `static/config.json` to configure your resource. This file is loaded at runtime and can be modified without rebuilding.

## Database Migrations

Database migrations are located in `src/server/migrations/`. To create a new migration:

1. Copy `TEMPLATE.ts` in the migrations folder
2. Name it with a sequential number (e.g., `002_add_users_table.ts`)
3. Implement the `up` and `down` functions
4. Migrations run automatically on resource start

## Technologies Used

### Core

- **TypeScript** - Type-safe JavaScript
- **ESBuild** - Fast bundler
- **Node.js 22** - Runtime environment

### Frontend (Web UI)

- **Vue 3** - Progressive JavaScript framework
- **Vuetify** - Material Design component framework
- **Vue Router** - File-based routing
- **Vite** - Next-generation frontend tooling
- **TypeScript** - Full type safety

### FiveM

- **ox_lib** - Utility library
- **NativeWrappers** - Type-safe native calls

## Development Tips

1. **Type Safety**: Use TypeScript's type system to catch errors early
2. **Hot Reload**: Use `yarn watch` during development for instant feedback
3. **UI Development**: Use `yarn web:dev` for faster UI iteration with HMR
4. **Code Quality**: Run `yarn lint` before committing changes
5. **Formatting**: Use `yarn format` to maintain consistent code style

## License

This project is based on the [Overextended FiveM TypeScript Boilerplate](https://github.com/overextended/fivem-typescript-boilerplate).

## Support

For issues or questions:

- Check the [Issues](https://github.com/overextended/fivem-typescript-boilerplate/issues) page
- Review FiveM documentation
- Join relevant Discord communities

## Author

SaiCode

---

**Note**: This is a boilerplate template. Customize it for your specific resource needs.
