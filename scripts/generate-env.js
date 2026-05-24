const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env');
const targetDir = path.join(root, 'src', 'environments');
const targetFile = path.join(targetDir, 'environment.ts');
const targetProdFile = path.join(targetDir, 'environment.prod.ts');

if (!fs.existsSync(envPath)) {
  console.error('.env file not found. Create one at the project root.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = envContent.split(/\r?\n/).reduce((acc, line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return acc;
  const [key, ...rest] = trimmed.split('=');
  acc[key.trim()] = rest.join('=').trim();
  return acc;
}, {});

const devUrl = env.API_URL_DEV || env.API_URL || '';
const prodUrl = env.API_URL_PROD || env.API_URL || devUrl;

const generateFile = (filePath, production, apiUrl) => {
  const content = `export const environment = {
  production: ${production},
  apiUrl: '${apiUrl}'
};
`;
  fs.writeFileSync(filePath, content, 'utf8');
};

generateFile(targetFile, false, devUrl);
generateFile(targetProdFile, true, prodUrl);

console.log('Generated environment files from .env');
