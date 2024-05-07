import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const ruta = dirname(__filename);
export const __dirname = resolve(ruta,'..')