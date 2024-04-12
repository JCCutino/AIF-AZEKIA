import { libEmpresas } from "../appLib/libEmpresas.mjs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpEmpresas {

    async  postObtenerEmpresas(req, res) {
        try {
            const empresas = await libEmpresas.obtenerEmpresas();
            return {empresas};
        } catch (err) {
            console.error('Error al obtener las empresas:', err);
            throw err; 
        }
    }

    async  postAgregarEmpresa(req, res) {
        try {
            const empresa = req.body.empresa;
            const empresaExiste = await libEmpresas.comprobarEmpresaExistente(empresa);
        if (empresaExiste) {
            const error = 'La empresa ya existe en la base de datos';
            return {error};
        } else {
            const resultado = await libEmpresas.agregarEmpresa(empresa);
            return {resultado};
        }
        } catch (err) {
            console.error('Error al obtener las empresas:', err);
            throw err; 
        }
    }

    async  postEliminarEmpresa(req, res) {
        try {
            const empresaCod = req.body.empresaCod;
            const empresas = await libEmpresas.eliminarEmpresa(empresaCod);
            return {empresas};
        } catch (err) {
            console.error('Error al obtener las empresas:', err);
            throw err; 
        }
    }

}

export default new HttpEmpresas();
