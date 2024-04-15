import { libEmpresas } from "../appLib/libEmpresas.mjs";
import { libGenerales } from "../appLib/libGenerales.mjs";

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpEmpresas {

    async postObtenerEmpresas(req, res) {
        try {
            const empresas = await libEmpresas.obtenerEmpresas();
            return { empresas };
        } catch (err) {
            console.error('Error al obtener las empresas:', err);
            throw err;
        }
    }

    async postAgregarEmpresa(req, res) {
        // de esta función se espera:
        // que sanitize req
        // que llame a un única funición de lib.agregarEmpresa
        // que haga:
        // res.send(200, { err: false, empresa: { datos de la empresa guardada } });
        // res.send(200, { err: true, errmsg: 'Ya existe una empresa con ese CIF' });
        // res.send(500) (<>200) 
        try {
            // AUTORIZAR
            // ¿el usuario se había autenticado?
            // ¿el usuario tiene pemiso para llamar a esta api?
            // ¿el usuario tiene permiso para llamar a esta api con estos datos (para un ámbito)?
            // SANITIZAR:
            // body trae un OBJETO llamado "empresa"
            // a partir de aquí podría hacerlo una función "validate" de la lib
            // empresaCod es una string de máximo 20 caracteres
            // empresaCif es una string de máximo 20 caracteres (y es un CIF válido)
            // etc. etc..
            // empresa no trae ningún atributo que no esté previsto
            // si todo ok...
            const empresa = req.body.empresa;

            if (!libGenerales.verificarLongitud(empresa.empresaCod, 20)) {
                res.send(200, { err: true, errmsg: 'La longitud del campo empresaCod excede el límite permitido' });
            } else if (!libGenerales.verificarLongitud(empresa.CIF, 20)) {
                res.send(200, { err: true, errmsg: 'La longitud del campo CIF excede el límite permitido' });
            } else if (!libGenerales.verificarLongitud(empresa.razonSocial, 100)) {
                res.send(200, { err: true, errmsg: 'La longitud del campo razón social excede el límite permitido' });
            } else if (!libGenerales.verificarLongitud(empresa.direccion, 150)) {
                res.send(200, { err: true, errmsg: 'La longitud del campo dirección excede el límite permitido' });
            } else if (!libGenerales.verificarLongitud(empresa.CP, 10)) {
                res.send(200, { err: true, errmsg: 'La longitud del campo CP excede el límite permitido' });
            } else if (!libGenerales.verificarLongitud(empresa.municipio, 50)) {
                res.send(200, { err: true, errmsg: 'La longitud del campo municipio excede el límite permitido' });
            } else {

                const empresaExistePorCodigo = await libEmpresas.comprobarExistenciaEmpresaPorCodigo(empresa.empresaCod);
                const empresaExistePorCIF = await libEmpresas.comprobarExistenciaEmpresaPorCIF(empresa.CIF);

                if (empresaExistePorCodigo || empresaExistePorCIF) {
                    res.send(200, { err: true, errmsg: 'La empresa ya existe en la base de datos' });
                } else {

                    const resultado = await libEmpresas.agregarEmpresa(empresa);
                    res.send(200, { err: false, empresa: { empresa } });
                }
            }
        } catch (err) {
            res.send(500)
        }
    }

    async postActualizarEmpresa(req, res) {
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

    async postEliminarEmpresa(req, res) {
        try {
            const empresaCod = req.body.empresaCod;
            const empresas = await libEmpresas.eliminarEmpresa(empresaCod);
            return { empresas };
        } catch (err) {
            console.error('Error al obtener las empresas:', err);
            throw err;
        }
    }

}

export default new HttpEmpresas();
