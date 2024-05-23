import { dbConexion } from "./dbConexion.mjs";
import { libFacturas } from "./libFacturas.mjs";
import { libGenerales } from "./libGenerales.mjs";
import { libEmpresas } from "./libEmpresas.mjs";
import { libSeries } from "./libSeries.mjs";
import { libProyectos } from "./libProyectos.mjs";
import { libImpuestos } from "./libImpuestos.mjs";

class LibFacturaLinea {

    async  eliminarLineasPorFactura(facturaVentaNum, empresaCod, serieCod) {
        try {
            const pool = await dbConexion.conectarDB(); 
            const request = pool.request(); 
            const query = `
                DELETE FROM 
                    FacturaVentaLinea 
                WHERE 
                    facturaVentaNum = @facturaVentaNum AND empresaCod = @empresaCod AND serieCod = @serieCod;
            `;
            request.input('facturaVentaNum', facturaVentaNum);
            request.input('empresaCod', empresaCod);
            request.input('serieCod', serieCod);
            const resultado = await request.query(query);
            await pool.close(); 

            return resultado.rowsAffected[0];
       } catch (error) {
            console.error('Error al eliminar FacturaVentaLineas:', error);
            throw 'Error al eliminar FacturaVentaLineas';
        }
    }
    
    async obtenerFacturaLineas(empresaCod, serieCod, facturaVentaNum) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = 'SELECT * FROM facturaventalinea WHERE empresaCod = @empresaCod AND serieCod = @serieCod AND facturaVentaNum = @facturaVentaNum';
            request.input('empresaCod', empresaCod);
            request.input('serieCod', serieCod);
            request.input('facturaVentaNum', facturaVentaNum);
            const resultados = await request.query(query);
            await pool.close();
            return resultados.recordset || [];
        } catch (error) {
            console.error('Error al obtener lineas factura:', error);
            throw 'Error al obtener facturas';
        }
    }

    async obtenerUltimaIDFacturaVentaLinea(empresaCod, serieCod, facturaVentaNum) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
    
            const query = `
                SELECT TOP 1 facturaVentaLineaNum 
                FROM FacturaVentaLinea 
                WHERE empresaCod = @empresaCod 
                  AND serieCod = @serieCod 
                  AND facturaVentaNum = @facturaVentaNum 
                ORDER BY facturaVentaLineaNum DESC
            `;

            request.input('empresaCod', empresaCod);
            request.input('serieCod', serieCod);
            request.input('facturaVentaNum', facturaVentaNum);

            const resultados = await request.query(query);
            await pool.close();
    
            if (resultados.recordset.length > 0) {
                return resultados.recordset[0].facturaVentaLineaNum;
            } else {
                return 0; 
            }
        } catch (error) {
            console.error('Error al obtener facturaVentaLineaNum:', error);
            throw 'Error al obtener facturaVentaLineaNum';
        }
    }
    
    
    async  agregarFacturaVentaLinea(empresaCod, serieCod, facturaVentaNum, facturaVentaLineaNum) {
        try {
            const pool = await dbConexion.conectarDB();
            const request = pool.request();
            const query = `
                INSERT INTO FacturaVentaLinea 
                (empresaCod, serieCod, facturaVentaNum, facturaVentaLineaNum, proyectoCod, texto, cantidad, precio, importeBruto, descuento, importeDescuento, importeNeto, tipoIVACod, tipoIRPFCod)
                VALUES 
                (@empresaCod, @serieCod, @facturaVentaNum, @facturaVentaLineaNum, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
            `;
            request.input('empresaCod', empresaCod);
            request.input('serieCod', serieCod);
            request.input('facturaVentaNum', facturaVentaNum);
            request.input('facturaVentaLineaNum', facturaVentaLineaNum);
                 
            const resultado = await request.query(query);
            await pool.close();
            return resultado.rowsAffected[0];
        } catch (error) {
            console.error('Error al agregar línea de factura:', error);
            throw 'Error al agregar línea de factura';
        }
    }

    async  eliminarLinea(facturaVentaNum, empresaCod, serieCod, facturaVentaLineaNum) {
        try {
            const pool = await dbConexion.conectarDB(); 
            const request = pool.request(); 
            const query = `
                DELETE FROM 
                    FacturaVentaLinea 
                WHERE 
                    facturaVentaNum = @facturaVentaNum AND empresaCod = @empresaCod AND serieCod = @serieCod AND facturaVentaLineaNum = @facturaVentaLineaNum;
            `;
            request.input('facturaVentaNum', facturaVentaNum);
            request.input('empresaCod', empresaCod);
            request.input('serieCod', serieCod);   
            request.input('facturaVentaLineaNum', facturaVentaLineaNum);

            const resultado = await request.query(query);
            await pool.close(); 

            return resultado.rowsAffected[0];
       } catch (error) {
            console.error('Error al eliminar FacturaVentaLineas:', error);
            throw 'Error al eliminar FacturaVentaLineas';
        }
    }
 
    
    async verficarFacturaVentaLineaAgregar(empresaCod, serieCod, facturaVentaNum){
  
        if (!await libGenerales.verificarLongitud(empresaCod, 20)) {
            return { isValid: false, errorMessage: 'El código de la empresa debe tener una longitud máxima de 20 caracteres.' };
        }
    
        if (!await libGenerales.verificarLongitud(serieCod, 10)) {
            return { isValid: false, errorMessage: 'El código de la serie debe tener una longitud máxima de 10 caracteres.' };
        }
        
        if (isNaN(facturaVentaNum)) {
            return { isValid: true, errorMessage: 'El número de la factura de venta debe ser formato numérico.' };
        }

        if (typeof empresaCod !== 'string' || typeof serieCod !== 'string') {
        return { isValid: false, errorMessage: 'Los códigos de empresa, serie y cliente deben ser cadenas de texto.' };
        }

        if(!await libEmpresas.comprobarExistenciaEmpresaPorCodigo(empresaCod)){
            return { isValid: false, errorMessage: 'El código de la empresa no existe.' };
        }

        if(!await libSeries.comprobarExistenciaSeriePorCodigo(serieCod, empresaCod)){
            console.log(serieCod);
            return { isValid: false, errorMessage: 'La serie no está asociada a la empresa.' };
        }

        if(!await libSeries.comprobarRelacionSerieYEmpresa(serieCod, empresaCod)){
            return { isValid: false, errorMessage: 'La serie no está asociada a la empresa.' };
        }

        if (await libFacturas.obtenerFacturaExistente(empresaCod, serieCod, facturaVentaNum)) {
            return { isValid: false, errorMessage: 'No existe una factura con el mismo código de empresa, serie y número de factura de venta.' };
        }
        
        return { isValid: true };

    }

    async  verificarFacturaVentaLineaRellenar(lineaFactura) {
        const { empresaCod, serieCod, facturaVentaNum } = lineaFactura;
    
        if (!await libGenerales.verificarLongitud(empresaCod, 20)) {
            return { isValid: false, errorMessage: 'El código de la empresa debe tener una longitud máxima de 20 caracteres.' };
        }
        if (!await libEmpresas.comprobarExistenciaEmpresaPorCodigo(empresaCod)) {
            return { isValid: false, errorMessage: 'El código de la empresa no existe.' };
        }
    
        if (!await libGenerales.verificarLongitud(serieCod, 10)) {
            return { isValid: false, errorMessage: 'El código de la serie debe tener una longitud máxima de 10 caracteres.' };
        }
        if (!await libSeries.comprobarExistenciaSeriePorCodigo(serieCod, empresaCod)) {
            return { isValid: false, errorMessage: 'La serie no está asociada a la empresa.' };
        }
        if (!await libSeries.comprobarRelacionSerieYEmpresa(serieCod, empresaCod)) {
            return { isValid: false, errorMessage: 'La serie no está asociada a la empresa.' };
        }
    
        if (isNaN(facturaVentaNum)) {
            return { isValid: false, errorMessage: 'El número de la factura de venta debe ser formato numérico.' };
        }
        if (!await libFacturas.obtenerFacturaExistente(empresaCod, serieCod, facturaVentaNum)) {
            return { isValid: false, errorMessage: 'No existe una factura con el mismo código de empresa, serie y número de factura de venta.' };
        }
    
        const { proyectoCod, texto, cantidad, precio, importeBruto, descuento, importeDescuento, importeNeto, tipoIVACod, tipoIRPFCod } = lineaFactura;
    
        if (proyectoCod && !await libProyectos.comprobarExistenciaProyectoPorCodigo(proyectoCod)) {
            return { isValid: false, errorMessage: 'El código del proyecto no existe.' };
        }
    
        if (texto && typeof texto !== 'string') {
            return { isValid: false, errorMessage: 'El texto debe ser una cadena de texto.' };
        }
    
        if (cantidad !== undefined) {
            if (isNaN(cantidad)) {
                return { isValid: false, errorMessage: 'La cantidad debe ser formato numérico.' };
            }
            if (!Number.isInteger(cantidad)) {
                return { isValid: false, errorMessage: 'La cantidad debe ser un número entero.' };
            }
        }
    
        if (precio !== undefined) {
            if (isNaN(precio)) {
                return { isValid: false, errorMessage: 'El precio debe ser formato numérico.' };
            }
            const decimalesPrecio = precio.toString().split('.')[1];
            if (decimalesPrecio && decimalesPrecio.length > 2) {
                return { isValid: false, errorMessage: 'El precio debe tener como máximo dos decimales.' };
            }
        }
    
        if (importeBruto !== undefined) {
            if (isNaN(importeBruto)) {
                return { isValid: false, errorMessage: 'El importe bruto debe ser formato numérico.' };
            }
            const decimalesBruto = importeBruto.toString().split('.')[1];
            if (decimalesBruto && decimalesBruto.length > 2) {
                return { isValid: false, errorMessage: 'El importe bruto debe tener como máximo dos decimales.' };
            }
        }
    
        if (descuento !== undefined) {
            if (isNaN(descuento)) {
                return { isValid: false, errorMessage: 'El descuento debe ser formato numérico.' };
            }
            const decimalesDescuento = descuento.toString().split('.')[1];
            if (decimalesDescuento && decimalesDescuento.length > 2) {
                return { isValid: false, errorMessage: 'El descuento debe tener como máximo dos decimales.' };
            }
        }
    
        if (importeDescuento !== undefined) {
            if (isNaN(importeDescuento)) {
                return { isValid: false, errorMessage: 'El importe de descuento debe ser formato numérico.' };
            }
            const decimalesImporteDescuento = importeDescuento.toString().split('.')[1];
            if (decimalesImporteDescuento && decimalesImporteDescuento.length > 2) {
                return { isValid: false, errorMessage: 'El importe de descuento debe tener como máximo dos decimales.' };
            }
        }
    
        if (importeNeto !== undefined) {
            if (isNaN(importeNeto)) {
                return { isValid: false, errorMessage: 'El importe neto debe ser formato numérico.' };
            }
            const decimalesNeto = importeNeto.toString().split('.')[1];
            if (decimalesNeto && decimalesNeto.length > 2) {
                return { isValid: false, errorMessage: 'El importe neto debe tener como máximo dos decimales.' };
            }
        }
    
        if (tipoIVACod && !await libImpuestos.comprobarExistenciaImpuestoPorCodigo(tipoIVACod)) {
            return { isValid: false, errorMessage: 'El código del tipo de IVA no existe.' };
        }
    
        if (tipoIRPFCod && !await libImpuestos.comprobarExistenciaImpuestoPorCodigo(tipoIRPFCod)) {
            return { isValid: false, errorMessage: 'El código del tipo de IRPF no existe.' };
        }
    
        return { isValid: true };
    }
    
    
}

export const libFacturaLinea = new LibFacturaLinea();