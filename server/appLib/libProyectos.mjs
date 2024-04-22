import { dbConexion } from "./dbConexion.mjs";
import { libGenerales } from "./libGenerales.mjs";

class LibProyectos {
    async obtenerProyectos() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT * FROM Proyecto';
                connection.query(query, (err, resultados) => {
                    if (err) {
                        console.error('Error al obtener proyectos:', err);
                        connection.end();
                        reject('Error al obtener proyectos');
                    } else {
                        connection.end();
                        resolve(resultados || []);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async obtenerProyectoPorCodigo(proyectoCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'SELECT * FROM Proyecto WHERE proyectoCod = ?';
                connection.query(query, [proyectoCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al obtener proyecto por código:', err);
                        reject('Error al obtener proyecto por código');
                    } else {
                        resolve(resultado[0] || null);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async agregarProyecto(proyecto) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'INSERT INTO Proyecto (proyectoCod, nombre, fechaInicio, fechaFinPrevisto, empresaCod, clienteCod, importeTotalPrevisto, importeExtraPrevisto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                connection.query(query, [proyecto.proyectoCod, proyecto.nombre, proyecto.fechaInicio, proyecto.fechaFinPrevisto, proyecto.empresaCod, proyecto.clienteCod, proyecto.importeTotalPrevisto, proyecto.importeExtraPrevisto], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al agregar proyecto:', err);
                        reject('Error al agregar proyecto');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async actualizarProyecto(proyecto) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'UPDATE Proyecto SET nombre = ?, fechaInicio = ?, fechaFinPrevisto = ?, empresaCod = ?, clienteCod = ?, importeTotalPrevisto = ?, importeExtraPrevisto = ? WHERE proyectoCod = ?';
                connection.query(query, [proyecto.nombre, proyecto.fechaInicio, proyecto.fechaFinPrevisto, proyecto.empresaCod, proyecto.clienteCod, proyecto.importeTotalPrevisto, proyecto.importeExtraPrevisto, proyecto.proyectoCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al actualizar proyecto:', err);
                        reject('Error al actualizar proyecto');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async eliminarProyecto(proyectoCod) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await dbConexion.conectarDB();
                const query = 'DELETE FROM Proyecto WHERE proyectoCod = ?';
                connection.query(query, [proyectoCod], (err, resultado) => {
                    connection.end();
                    if (err) {
                        console.error('Error al eliminar proyecto:', err);
                        reject('Error al eliminar proyecto');
                    } else {
                        resolve(resultado);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async verificarProyecto(proyecto, actualizar = false) {
        if (!libGenerales.verificarCamposVacios(proyecto)) {
            return false;
        }
        
        if (!libGenerales.verificarLongitud(proyecto.proyectoCod, 20)) {
            return false;
        }
    
        if (!libGenerales.verificarLongitud(proyecto.nombre, 100)) {
            return false;
        }
    
        
    
        // Verificar que los campos de empresaCod y clienteCod sean cadenas de texto (pueden ser validados según el formato esperado)
        if (typeof proyecto.empresaCod !== 'string' || typeof proyecto.clienteCod !== 'string') {
            return false;
        }
    
        // Verificar que los campos de importeTotalPrevisto e importeExtraPrevisto sean números
        if (isNaN(proyecto.importeTotalPrevisto) || isNaN(proyecto.importeExtraPrevisto)) {
            return false;
        }
    
        if (actualizar === true) {
            return true;
        }
    
        const proyectoExistente = await this.obtenerProyectoPorCodigo(proyecto.proyectoCod);
    
        return !proyectoExistente;
    }
    
}

export const libProyectos = new LibProyectos();
