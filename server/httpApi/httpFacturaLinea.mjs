import { libFacturaVenta } from "../appLib/libFacturas.mjs";
import { libImpuestos } from "../appLib/libImpuestos.mjs";
import { libGenerales } from "../appLib/libGenerales.mjs";

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '../../browser');

class HttpFacturaLinea {

    async  postObtenerDatosFinalesFactura(req, res) {
        try {
            const { empresaCod, serieCod, facturaVentaNum } = req.body;
            
            if (!await libFacturaVenta.existeFactura(empresaCod, serieCod, facturaVentaNum)) {
                return res.status(200).send({ err: true, errmsg: 'La factura no existe.' });
            }
    
            const tiposImpuesto = await libImpuestos.obtenerCodigosImpuestos();
            const importesLineas = await libFacturaVenta.obtenerImportesLineas(empresaCod, serieCod, facturaVentaNum);
    
            if (!importesLineas) {
                return res.status(200).send({ err: true, errmsg: 'No se han podido obtener los datos finales de la factura' });
            }
    
            const result = await libFacturaVenta.obtenerImportesImpuestos(tiposImpuesto, importesLineas);
    
            await libFacturaVenta.eliminarImpuestos(empresaCod, serieCod, facturaVentaNum);
            await libFacturaVenta.insertarImpuestos(empresaCod, serieCod, facturaVentaNum, result);
            
            res.status(200).send({ err: false, FacturaVentaImpuesto: result });
    
        } catch (err) {
            console.error('Error al obtener datos finales de la factura:', err);
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor' });
        }
    }
    

    async postObtenerFacturaLineas(req, res) {
        try {
            const { empresaCod, serieCod, facturaVentaNum } = req.body;
    
            console.log(empresaCod, serieCod, facturaVentaNum);
    
            const facturaExistente = await libFacturaVenta.existeFactura(empresaCod, serieCod, facturaVentaNum);
    
            if (facturaExistente) {
                const facturaLineas = await libFacturaVenta.obtenerLineas(empresaCod, serieCod, facturaVentaNum);
        
                if (facturaLineas && facturaLineas.length > 0) {
                    res.status(200).send({ err: false, facturaLineas });
                } else {
                    res.status(200).send({ err: true, errmsg: 'No hay líneas de factura añadidas en este momento' });
                }
            } else {
                res.status(200).send({ err: true, errmsg: 'La factura no existe.' });
            }
        } catch (err) {
            console.error('Error al obtener las líneas de la factura:', err);
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor' });
        }
    }
    

    async postAgregarFacturaLinea(req, res) {
        try {
            const empresaCod = req.body.empresaCod;
            const serieCod = req.body.serieCod;
            const facturaVentaNum = req.body.facturaVentaNum;

            console.log(empresaCod, serieCod, facturaVentaNum);
            if (!empresaCod || !serieCod || !facturaVentaNum) {
                return res.status(400).send({ err: true, errmsg: "Faltan parámetros requeridos." });
            }

            const ultimaLineaNum = await libFacturaVenta.obtenerUltimaIDLinea(empresaCod, serieCod, facturaVentaNum);

            if (ultimaLineaNum === null || ultimaLineaNum === undefined) {
                return res.status(500).send({ err: true, errmsg: "Error al obtener el último número de línea de factura." });
            }

            const facturaVentaLineaNum = ultimaLineaNum + 1;

            const resultadoVerificacion = await libFacturaVenta.validarLineaParaAgregar(empresaCod, serieCod, facturaVentaNum);

            if (resultadoVerificacion.isValid) {
                await libFacturaVenta.agregarLinea(empresaCod, serieCod, facturaVentaNum, facturaVentaLineaNum);
                res.status(200).send({ err: false });
            } else {
                res.status(200).send({ err: true, errmsg: resultadoVerificacion.errorMessage });
            }
        } catch (err) {
            console.error('Error en postAgregarFacturaLinea:', err);
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor.' });
        }
    }

    async postEliminarFacturaLinea(req, res) {
        try {
            const empresaCod = req.body.empresaCod;
            const serieCod = req.body.serieCod;
            const facturaVentaNum = req.body.facturaVentaNum;
            const facturaVentaLineaNum = req.body.facturaVentaLineaNum;

            const facturaExistente = libFacturaVenta.existeFactura(empresaCod, serieCod, facturaVentaNum);

            if (facturaExistente) {
            

            const linea = await libFacturaVenta.eliminarLinea(facturaVentaNum, empresaCod, serieCod, facturaVentaLineaNum);

            res.send(200, { err: false });
            }else {
                res.status(200).send({ err: true, errmsg: 'La factura no existe.' });
            }
        } catch (err) {
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor.' });
        }
    }

    async postRellenarFacturaLinea(req, res) {
        try {
            const lineaFactura = req.body.lineaFactura;
    
            console.log(lineaFactura);
            if (Object.prototype.toString.call(lineaFactura) === '[object Object]') {
                const atributosRequeridos = ['empresaCod', 'serieCod', 'facturaVentaNum', 'facturaVentaLineaNum'];
                const atributosOpcionales = ['proyectoCod', 'texto', 'cantidad', 'precio', 'importeBruto', 'descuento', 'tipoIVACod', 'tipoIRPFCod'];
                const todosLosAtributos = [...atributosRequeridos, ...atributosOpcionales];
    
                const atributosLineaFactura = Object.keys(lineaFactura);
    
                const atributosObligatoriosDefinidos = atributosRequeridos.every(key => atributosLineaFactura.includes(key) && lineaFactura[key] !== null && lineaFactura[key] !== undefined);
    
                if (atributosObligatoriosDefinidos) {
                    const atributosFaltantes = atributosRequeridos.filter(key => !atributosLineaFactura.includes(key));
                    const atributosExtra = atributosLineaFactura.filter(key => !todosLosAtributos.includes(key));
    
                    if (atributosFaltantes.length === 0 && atributosExtra.length === 0) {
                        const atributosInvalidos = atributosLineaFactura.filter(key => {
                            const value = lineaFactura[key];
                            if (value === null || value === undefined) return false;
                            switch (key) {
                                case 'cantidad':
                                case 'precio':
                                case 'importeBruto':
                                case 'descuento':
                                    return isNaN(parseFloat(value));
                                default:
                                    return typeof value !== 'string' || value.trim() === '';
                            }
                        });
    
                        if (atributosInvalidos.length === 0) {
                            const camposParaActualizar = {};
                            for (const key of atributosOpcionales) {
                                if (lineaFactura[key] !== null && lineaFactura[key] !== undefined) {
                                    camposParaActualizar[key] = lineaFactura[key];
                                }
                            }
    
                            for (const key of atributosRequeridos) {
                                camposParaActualizar[key] = lineaFactura[key];
                            }
    
                            if (Object.keys(camposParaActualizar).length === atributosRequeridos.length) {
                                return res.status(200).send({
                                    err: true,
                                    errmsg: 'No hay campos opcionales proporcionados para actualizar.'
                                });
                            }
    
                            const resultadoVerificacion = await libFacturaVenta.validarLineaParaActualizar(lineaFactura);
    
                            if (resultadoVerificacion.isValid) {
                                const lineaFacturaActual = await libFacturaVenta.obtenerLinea(lineaFactura.empresaCod, lineaFactura.serieCod, lineaFactura.facturaVentaNum, lineaFactura.facturaVentaLineaNum);
    
                                const camposDiferentes = {};
                                // Agregar siempre las claves de referencia
                                for (const key of atributosRequeridos) {
                                    camposDiferentes[key] = lineaFactura[key];
                                }
    
                                // Comparar los campos opcionales
                                for (const key in camposParaActualizar) {
                                    if (lineaFacturaActual[key] !== camposParaActualizar[key]) {
                                        camposDiferentes[key] = camposParaActualizar[key];
                                    }
                                }
    
                                if (Object.keys(camposDiferentes).length > atributosRequeridos.length) {
                                    const camposImporteBrutoKeys = ['cantidad', 'precio', 'importeBruto'];
    
                                    const existenTodosImporteBruto = camposImporteBrutoKeys.every(key => key in lineaFactura && lineaFactura[key] !== null);
    
                                    if (existenTodosImporteBruto) {
                                        const validacionImporteBruto = await libFacturaVenta.verificarCamposImporteBruto(lineaFactura.cantidad, lineaFactura.precio, lineaFactura.importeBruto);
                                        if (!validacionImporteBruto.isValid) {
                                            return res.status(200).send({ err: true, errmsg: validacionImporteBruto.errorMessage });
                                        }
                                    }                                
                                    
                                    const camposImporteDescuentoKeys = ['cantidad', 'precio', 'importeBruto', 'descuento'];
                                    const existenTodosImporteDescuento = camposImporteDescuentoKeys.every(key => key in lineaFactura && lineaFactura[key] !== null);

                                    if (existenTodosImporteDescuento) {
                                        lineaFactura.importeDescuento = libGenerales.redondeoEuros(lineaFactura.importeBruto * (lineaFactura.descuento / 100));
                                        camposDiferentes.importeDescuento = lineaFactura.importeDescuento;

                                        const importeNeto = lineaFactura.importeBruto - lineaFactura.importeDescuento;
                                        camposDiferentes.importeNeto = importeNeto;
                                    }
                                    
    
                                    const resultado = await libFacturaVenta.actualizarLinea(camposDiferentes);
    
                                    res.status(200).send({ err: false, lineaFacturaActualizada: resultado });
    
                                } else {
                                    res.status(200).send({
                                        err: false,
                                        message: 'No hay cambios para actualizar.'
                                    });
                                }
                            } else {
                                res.status(200).send({ err: true, errmsg: resultadoVerificacion.errorMessage });
                            }
                        } else {
                            res.status(200).send({
                                err: true,
                                errmsg: `Los siguientes atributos de la línea de factura deben tener el tipo de datos correcto: ${atributosInvalidos.join(', ')}.`
                            });
                        }
                    } else {
                        res.status(200).send({
                            err: true,
                            errmsg: `El objeto de la línea de factura debe contener exactamente las siguientes claves obligatorias: ${atributosRequeridos.join(', ')} y solo las siguientes claves opcionales: ${atributosOpcionales.join(', ')}.`
                        });
                    }
                } else {
                    res.status(200).send({
                        err: true,
                        errmsg: `Los siguientes atributos obligatorios no están definidos en el objeto de la línea de factura: ${atributosRequeridos.join(', ')}.`
                    });
                }
            } else {
                res.status(200).send({ err: true, errmsg: 'El cuerpo de la solicitud no contiene un objeto de línea de factura válido' });
            }
        } catch (err) {
            console.error('Error al rellenar línea de factura:', err);
            res.status(500).send({ err: true, errmsg: 'Error interno del servidor' });
        }
    }
    

    async postObtenerUltimoNumFila(req, res) {
        try {
            const empresaCod = req.body.empresaCod;
            const serieCod = req.body.serieCod;
            const facturaVentaNum = req.body.facturaVentaNum;

            const ultimoNum = await libFacturaVenta.obtenerUltimoNumLinea(empresaCod, serieCod, facturaVentaNum);

            
            res.send(200, { err: false, ultimoNum: ultimoNum });
        } catch (err) {
            console.error('Error al eliminar factura:', err);
            res.send(500);
        }
    }

}

export default new HttpFacturaLinea();
