import { dbConexion } from "./dbConexion.mjs";

class LibEmpresas {

    obtenerEmpresas(pagina = 1, resultadosPorPagina = 10) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const offset = (pagina - 1) * resultadosPorPagina;
                const query = 'SELECT * FROM Empresa LIMIT ?, ?';
                connection.query(query, [offset, resultadosPorPagina], (err, resultados) => {
                    if (err) {
                        console.error('Error al obtener empresas:', err);
                        connection.end(); 
                        reject('Error al obtener empresas');
                    } else {
                        if (resultados.length === 0) {
                            connection.end(); 
                            reject('Empresas no encontradas');
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
    
    agregarEmpresa(empresa) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB(); 
                const query = 'INSERT INTO Empresa (empresaCod, CIF, razonSocial, direccion, CP, municipio) VALUES (?, ?, ?, ?, ?, ?)';
                connection.query(query, [empresa.empresaCod, empresa.CIF, empresa.razonSocial, empresa.direccion, empresa.CP, empresa.municipio], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al agregar empresa:', err);
                        reject('Error al agregar empresa');
                    } else {
                        resolve(resultado); 
                    }
                });
            } catch (error) {
                reject(error); 
            }
        });
    }
    

    
}

export const libEmpresas = new LibEmpresas();