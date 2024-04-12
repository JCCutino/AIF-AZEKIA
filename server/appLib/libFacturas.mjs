import { dbConexion } from "./dbConexion.mjs";

class LibFacturas {

    obtenerFacturas(pagina = 1, resultadosPorPagina = 10) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const offset = (pagina - 1) * resultadosPorPagina;
                const query = 'SELECT * FROM facturaventa LIMIT ?, ?';
                connection.query(query, [offset, resultadosPorPagina], (err, resultados) => {
                    if (err) {
                        console.error('Error al obtener facturas:', err);
                        connection.end(); 
                        reject('Error al obtener empresas');
                    } else {
                        if (resultados.length === 0) {
                            connection.end(); 
                            reject('Facturas no encontradas');
                        } else {
                            connection.end(); 
                            resolve(resultados); 
                        }
                    }
                });
            } catch (error) {
                reject(error); 
            }
        });
    }

    
}

export const libFacturas = new LibFacturas();