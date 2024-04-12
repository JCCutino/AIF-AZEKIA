import { libUsuarios } from "../appLib/libUsuarios.mjs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpUsuarios {

    async mostrarEmpresas(req, res) {
            
        res.sendFile(path.join(staticFilesPath, 'pages/empresas/empresa.html'));
        
    } catch (error) {
            console.error('Error al procesar la acción de turno:', error);
            res.status(500).send('Error al conectar con la base de datos');
        }
    async mostrarClientes(req, res) {
            
        res.sendFile(path.join(staticFilesPath, 'pages/clientes/cliente.html'));
        
    } catch (error) {
            console.error('Error al procesar la acción de turno:', error);
            res.status(500).send('Error al conectar con la base de datos');
        }
    async mostrarFacturas(req, res) {
            
        res.sendFile(path.join(staticFilesPath, 'pages/facturas/facturas.html'));
        
    } catch (error) {
            console.error('Error al procesar la acción de turno:', error);
            res.status(500).send('Error al conectar con la base de datos');
        }    
    }

export default new HttpUsuarios();
