import { libUsuarios } from "../appLib/libUsuarios.mjs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpUsuarios {

    async  mostrarEmpresas(req, res) {
        try {
            res.sendFile(path.join(staticFilesPath, 'pages/empresas/empresa.html'));
        } catch (error) {
            console.error('Error al procesar la acción de mostrar empresas:', error);
            res.status(500).send('Error al procesar la acción de mostrar empresas');
        }
    }

    async  mostrarClientes(req, res) {
        try {
            res.sendFile(path.join(staticFilesPath, 'pages/clientes/cliente.html'));
        } catch (error) {
            console.error('Error al procesar la acción de mostrar clientes:', error);
            res.status(500).send('Error al procesar la acción de mostrar clientes');
        }
    }

    async  mostrarProyectos(req, res) {
        try {
            res.sendFile(path.join(staticFilesPath, 'pages/proyectos/proyecto.html'));
        } catch (error) {
            console.error('Error al procesar la acción de mostrar proyectos:', error);
            res.status(500).send('Error al procesar la acción de mostrar proyectos');
        }
    }

    async  mostrarSeries(req, res) {
        try {
            res.sendFile(path.join(staticFilesPath, 'pages/series/serie.html'));
        } catch (error) {
            console.error('Error al procesar la acción de mostrar series:', error);
            res.status(500).send('Error al procesar la acción de mostrar series');
        }
    }

    async  mostrarFacturas(req, res) {
        try {
            res.sendFile(path.join(staticFilesPath, 'pages/facturas/factura.html'));
        } catch (error) {
            console.error('Error al procesar la acción de mostrar facturas:', error);
            res.status(500).send('Error al procesar la acción de mostrar facturas');
        }
    }
    
    async  mostrarImpuestos(req, res) {
        try {
            res.sendFile(path.join(staticFilesPath, 'pages/impuestos/impuesto.html'));
        } catch (error) {
            console.error('Error al procesar la acción de mostrar impuestos:', error);
            res.status(500).send('Error al procesar la acción de mostrar impuestos');
        }
    }
    async mostrarClientes(req, res) {
        try {
        res.sendFile(path.join(staticFilesPath, 'pages/clientes/cliente.html'));
        
    } catch (error) {
            console.error('Error al procesar la acción de turno:', error);
            res.status(500).send('Error al conectar con la base de datos');
        }
    }
    async mostrarFacturas(req, res) {
        try {
        res.sendFile(path.join(staticFilesPath, 'pages/facturas/facturas.html'));
        
    } catch (error) {
            console.error('Error al procesar la acción de turno:', error);
            res.status(500).send('Error al conectar con la base de datos');
        }    
    }
}

export default new HttpUsuarios();
