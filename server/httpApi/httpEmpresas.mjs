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
        const empresaExistePorCodigo = await libEmpresas.comprobarExistenciaEmpresaPorCodigo(empresa.empresaCod);
        const empresaExistePorCIF = await libEmpresas.comprobarExistenciaEmpresaPorCIF(empresa.CIF);

    if (empresaExistePorCodigo || empresaExistePorCIF) {
        const error = 'La empresa ya existe en la base de datos';
        return { error };
    } else {
        const resultado = await libEmpresas.agregarEmpresa(empresa);
        const exito = 'La empresa se ha agregado con exito';

        return { exito };
    }
        } catch (err) {
            console.error('Error al obtener las empresas:', err);
            throw err; 
        }
    }

    async  postActualizarEmpresa(req, res) {
        try {
            const empresa = req.body.empresa;
            const empresaExistePorCIF = await libEmpresas.comprobarExistenciaEmpresaPorCIF(empresa.CIF);
    
            if (empresaExistePorCIF) {
                const error = 'La empresa ya existe en la base de datos';
                return { error };
            }
            const resultado = await libEmpresas.actualizarEmpresa(empresa);
            const exito = 'La empresa se ha actualizado con exito';

            return { exito };
        } catch (err) {
            console.error('Error al actualizar la empresa:', err);
            return res.status(500).json({ error: 'Error al actualizar la empresa' });
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
