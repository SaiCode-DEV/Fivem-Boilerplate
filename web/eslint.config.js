import vuetify from 'eslint-config-vuetify';

// Disable stylistic rules since we use Biome for formatting
export default vuetify({
  rules: {
    '@stylistic/semi': 'off',
    '@stylistic/indent': 'off',
    '@stylistic/quotes': 'off',
    '@stylistic/comma-dangle': 'off',
  },
});
