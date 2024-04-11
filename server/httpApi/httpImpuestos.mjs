import { libImpuestos } from "../appLib/libImpuestos.mjs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpImpuestos {


}

export default new HttpImpuestos();
