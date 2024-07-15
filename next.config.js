/** @type {import('next').NextConfig} */
/*
const nextConfig = {
  reactStrictMode: true,
  cssModules: true,
}

module.exports = nextConfig*/
module.exports = {
  // ...otras configuraciones...
  cssModules: {
    // Ignorar el directorio que está causando el problema
    exclude: [
      'node_modules/@cyntler/react-doc-viewer/dist/esm/renderers/pdf/index.js',
    ],
  },
};
