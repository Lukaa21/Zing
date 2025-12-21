import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const candidates = [
  path.resolve(__dirname, '..', '.env'),             // apps/backend/.env
  path.resolve(__dirname, '..', '..', '..', '.env'), // repo root .env
];

let loadedFrom: string | null = null;

for (const p of candidates) {
  if (fs.existsSync(p)) {
    const envContent = fs.readFileSync(p, 'utf-8');
    console.log('Raw .env file content:', envContent.substring(0, 100));
    
    const result = dotenv.config({ path: p, override: true });
    
    console.log('ENV FILE LOADED FROM:', p);
    console.log('Dotenv parsed:', result.parsed);
    console.log('DATABASE_URL from parsed:', result.parsed?.DATABASE_URL);
    console.log('process.env.DATABASE_URL:', process.env.DATABASE_URL);
    
    // Manual parse as fallback with BOM cleanup
    if (!result.parsed || Object.keys(result.parsed).length === 0) {
      console.log('Dotenv parse failed, trying manual parse...');
      // Remove BOM if present
      let cleanContent = envContent;
      if (cleanContent.charCodeAt(0) === 0xFEFF) {
        cleanContent = cleanContent.slice(1);
      }
      
      const lines = cleanContent.split('\n');
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith('#')) continue;
        
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim();
          process.env[key.trim()] = value;
          console.log(`Manually set: ${key.trim()} = ${value}`);
        }
      }
    }
    
    loadedFrom = p;
    break;
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    `DATABASE_URL is missing. Checked: ${candidates.join(' | ')}. LoadedFrom=${loadedFrom}`
  );
}
