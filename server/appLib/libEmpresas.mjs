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

    comprobarEmpresaExistente(codEmpresa, CIF) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT COUNT(*) AS count FROM Empresa WHERE empresaCod = ? OR CIF = ?';
                connection.query(query, [codEmpresa, CIF], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al comprobar empresa existente:', err);
                        reject('Error al comprobar empresa existente');
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