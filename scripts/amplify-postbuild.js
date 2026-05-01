import { mkdirSync, writeFileSync, cpSync } from 'fs'

// Create .amplify-hosting structure
mkdirSync('.amplify-hosting/compute/default', { recursive: true })
mkdirSync('.amplify-hosting/static', { recursive: true })

// Copy static assets
cpSync('dist/client', '.amplify-hosting/static', { recursive: true })

// Copy server
cpSync('dist/server', '.amplify-hosting/compute/default', { recursive: true })

// Write the manifest
writeFileSync('.amplify-hosting/deploy-manifest.json', JSON.stringify({
  version: 1,
  routes: [
    { path: '/assets/*', target: { kind: 'Static' } },
    { path: '/*', target: { kind: 'Compute', src: 'default' } }
  ],
  computeResources: [{
    name: 'default',
    runtime: 'nodejs18.x',
    entrypoint: 'server.js'
  }]
}, null, 2))

console.log('✓ .amplify-hosting structure created')