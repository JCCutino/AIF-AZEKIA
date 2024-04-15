import { dbConexion } from "./dbConexion.mjs";

class LibEmpresas {

    obtenerEmpresas() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT * FROM Empresa';
                connection.query(query, (err, resultados) => {
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
        // esta función debe devolver un objeto con el resultado
        // de modo que las funciones que responden a ruta lo puedan devolver en un res inequivocamnete
        // p.ej. true >> send(200, {err: false})
        
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

    actualizarEmpresa(empresa) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB(); 
                const query = 'UPDATE Empresa SET CIF = ?, razonSocial = ?, direccion = ?, CP = ?, municipio = ? WHERE empresaCod = ?';
                connection.query(query, [empresa.CIF, empresa.razonSocial, empresa.direccion, empresa.CP, empresa.municipio, empresa.empresaCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al actualizar empresa:', err);
                        reject('Error al actualizar empresa');
                    } else {
                        resolve(resultado); 
                    }
                });
            } catch (error) {
                reject(error); 
            }
        });
    } 
    comprobarExistenciaEmpresaPorCodigo(codEmpresa) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT COUNT(*) AS count FROM Empresa WHERE empresaCod = ?';
                connection.query(query, [codEmpresa], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al comprobar empresa existente por código:', err);
                        reject('Error al comprobar empresa existente por código');
                    } else {
                        resolve(resultado[0].count > 0);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    comprobarExistenciaEmpresaPorCIF(CIF) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT COUNT(*) AS count FROM Empresa WHERE CIF = ?';
                connection.query(query, [CIF], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al comprobar empresa existente por CIF:', err);
                        reject('Error al comprobar empresa existente por CIF');
                    } else {
                        resolve(resultado[0].count > 0);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    
    
    eliminarEmpresa(empresaCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'DELETE FROM Empresa WHERE empresaCod = ?';
                connection.query(query, [empresaCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al eliminar empresa:', err);
                        reject('Error al eliminar empresa');
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