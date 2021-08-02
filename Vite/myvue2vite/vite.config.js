const { createVuePlugin } = require('vite-plugin-vue2');
import lagacy from '@vitejs/plugin-legacy'

module.exports = {
  plugins: [
    createVuePlugin(),
    lagacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']  
    })
  ],
};
