name 'fivem-typescript-boilerplate'
author 'SaiCode'
version '0.0.0'
description 'A FiveM resource boilerplate using Vue, Vuetify and TypeScript'
fx_version 'cerulean'
game 'gta5'
ui_page 'dist/web/index.html'
node_version '22'

files {
	'locales/*.json',
	'dist/web/**/*',
	'static/**/*',
	'locales/**/*',
}

dependencies {
	'/server:13068',
	'/onesync',
}

client_scripts {
	'dist/client.js',
}

server_scripts {
	'dist/server.js',
}
