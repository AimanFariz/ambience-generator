/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export
  distDir: 'build',  // Custom directory to avoid `_next` name conflict
};

module.exports = nextConfig;
