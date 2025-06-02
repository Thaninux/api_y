const { spawn } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

// 
function startService(serviceName, servicePath, entryFile) {
  const envPath = path.join(servicePath, '.env');
  const envConfig = fs.existsSync(envPath) ? dotenv.parse(fs.readFileSync(envPath)) : {};
  const env = { ...process.env, ...envConfig };

  const child = spawn('node', [entryFile], {
    cwd: servicePath,
    env,
    stdio: 'inherit',
    shell: true,
  });

  child.on('close', (code) => {
    console.log(`${serviceName} s'est arrêté avec le code ${code}`);
  });

  console.log(`${serviceName} démarré`);
}

// Liste des services à démarrer
startService('API Gateway', './api-gateway', 'server.js');
startService('Auth Service', './auth-service', 'server.js');
startService('Post Service', './post-service', 'server.js');
startService('Like Service', './like-service', 'server.js');
