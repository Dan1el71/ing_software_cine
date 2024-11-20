import { Response } from "express";
import { SQL_CINES } from "../repository/Sql_cines"
import pool from "../../../config/connection/dbConnection";
import Cine from "../entity/Cine";

class CineDAO {
    protected static async obtenerCine(params: any, res: Response): Promise<void> {
        const idCine = parseInt(params.idCine as unknown as string, 10); // Convierte el ID a número
        await pool
            .oneOrNone(SQL_CINES.GET_CINE, [idCine])
            .then((resultado) => {
                if (!resultado) { // Si el resultado es nulo o no existe
                    res.status(404).json({ respuesta: "Cine no encontrado" });
                } else {
                    res.status(200).json(resultado); // Enviar solo el objeto
                }
            })
            .catch((miError) => {
                console.error(miError);
                res.status(400).json({ respuesta: "Error al obtener la información del cine" });
            });
    }


    // protected static async obtenerCine(params: any, res: Response){
    //   await pool.one(SQL_CINES.GET_CINE, [params.idCine])
    //   .then((resultado) => {
    //       if (resultado.rows.length === 0) {
    //           res.status(404).json({ respuesta: "Cine no encontrado" });
    //       } else {
    //           res.status(200).json(resultado.rows);
    //       }
    //   })
    //   .catch((miError) => {
    //       console.error(miError);
    //       res.status(400).json({ respuesta: "Error al obtener la información de el cine" });
    //   });
    // }

    // Método para obtener todos los cines
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_CINES.GET_ALL, params)
            .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
            .catch((miError) => {
                // console.error(miError);
                res.status(400).json({ respuesta: "Error al obtener la información de los cines" });
            });
    }

    //metodo para la parte del paginado
    protected static async obtenerCinesPaginados(limit: number, offset: number, res: Response) {
        await pool.result(SQL_CINES.GET_PAGE, [limit, offset])
            .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
            .catch((miError) => {
                // console.error(miError);
                res.status(400).json({ respuesta: "Error al obtener la información de los cines paginados" });
            });
    }

    // Verificar si el cine ya existe
    protected static async cineYaExiste(nombreCine: string, idUbicacion: number): Promise<boolean> {
        const resultado = await pool.one(SQL_CINES.CHECK_IF_EXISTS, [nombreCine, idUbicacion]);
        return resultado.total > 0; // Si es mayor que 0, ya existe
    }

    // Verificar si la ubicación existe
    protected static async ubicacionExiste(idUbicacion: number): Promise<boolean> {
        const resultado = await pool.one(SQL_CINES.CHECK_UBICACION_EXISTS, [idUbicacion]);
        return resultado.total > 0; // Si es mayor que 0, la ubicación existe
    }

    // Método para agregar un nuevo cine con validaciones
    protected static async grabeloYa(datos: Cine, res: Response): Promise<any> {
        try {
            // Verificar si la ubicación existe
            const ubicacionValida = await this.ubicacionExiste(datos.idUbicacion);
            if (!ubicacionValida) {
                return res.status(400).json({ respuesta: "La ubicación no existe" });
            }

            // Verificar si el cine ya existe con el mismo nombre y ubicación
            const cineExiste = await this.cineYaExiste(datos.nombreCine, datos.idUbicacion);
            if (cineExiste) {
                return res.status(400).json({ respuesta: "El cine ya existe en esa ubicación" });
            }

            // Si todo está bien, agrega el cine
            const resultado = await pool.one(SQL_CINES.ADD, [datos.idUbicacion, datos.nombreCine]);
            res.status(200).json(resultado);

        } catch (miError) {
            // console.error(miError);
            res.status(400).json({ respuesta: "Error al agregar el cine" });
        }
    }

    // Método para eliminar un cine
    protected static async borreloYa(idCine: Number, res: Response): Promise<any> {
        try {

            const cineExiste = await pool.oneOrNone(SQL_CINES.GET_CINE_BY_ID, [idCine]);


            if (!cineExiste || Object.keys(cineExiste).length === 0) {
                // Si el cine no existe, devolver un error 404
                return res.status(404).json({ respuesta: "El cine no existe" });
            }

            // Verificar si el cine está sindo utilizado en alguna de las tablas relacionadas
            const cineEnPeliculasCarteleras = await pool.one(SQL_CINES.CHECK_IF_USED_IN_PELICULAS_CARTELERAS, [idCine]);
            const cineEnTrabajadores = await pool.one(SQL_CINES.CHECK_IF_USED_IN_TRABAJADORES, [idCine]);
            const cineEnSalas = await pool.one(SQL_CINES.CHECK_IF_USED_IN_SALAS, [idCine]);
            const cineEnMenuCine = await pool.one(SQL_CINES.CHECK_IF_USED_IN_MENU_CINE, [idCine]);

            if (cineEnPeliculasCarteleras.total > 0 || cineEnTrabajadores.total > 0 || cineEnSalas.total > 0 || cineEnMenuCine.total > 0) {
                return res.status(400).json({
                    respuesta: "No se puede eliminar el cine porque está siendo usado en otras tablas (Películas Carteleras, Trabajadores, Salas, o Menú Cine)."
                });
            }

            // Si no está en uso, proceder con la eliminación
            await pool.result(SQL_CINES.DELETE, [idCine]);

            res.status(200).json({
                respuesta: "el cine fue elimnado correctamente"
            });
        } catch (miError) {
            // console.error(miError);
            res.status(400).json({ respuesta: "Error al eliminar el cine" });
        }
    }

    protected static async borreloYaSinMensaje(datos: Cine): Promise<boolean> {
        try {
            // Verificar si el cine está siendo utilizado en alguna de las tablas relacionadas
            const cineEnPeliculasCarteleras = await pool.one(SQL_CINES.CHECK_IF_USED_IN_PELICULAS_CARTELERAS, [datos.idCine]);
            const cineEnTrabajadores = await pool.one(SQL_CINES.CHECK_IF_USED_IN_TRABAJADORES, [datos.idCine]);
            const cineEnSalas = await pool.one(SQL_CINES.CHECK_IF_USED_IN_SALAS, [datos.idCine]);
            const cineEnMenuCine = await pool.one(SQL_CINES.CHECK_IF_USED_IN_MENU_CINE, [datos.idCine]);

            if (cineEnPeliculasCarteleras.total > 0 || cineEnTrabajadores.total > 0 || cineEnSalas.total > 0 || cineEnMenuCine.total > 0) {
                // Si el cine está siendo utilizado en alguna tabla, no se elimina
                return false; // No se eliminó
            }

            // Si no está en uso, proceder con la eliminación
            await pool.result(SQL_CINES.DELETE, [datos.idCine]);
            return true; // El cine fue eliminado correctamente
        } catch {
            // Si ocurre un error, retornar false
            return false;
        }
    }


    protected static async borraloTodoYa(res: Response): Promise<any> {
        try {
            // Obtener todos los cines de la base de datos
            const todosLosCines = await pool.any(SQL_CINES.GET_ALL);

            if (todosLosCines.length === 0) {
                return res.status(200).json({
                    respuesta: "No hay cines para eliminar."
                });
            }

            // Array para acumular los IDs de los cines eliminados
            const cinesEliminados = [];

            // Iterar sobre cada cine y llamar a borreloYaSinMensaje
            for (const cine of todosLosCines) {
                const exito = await this.borreloYaSinMensaje(cine);
                if (exito) {
                    cinesEliminados.push(cine.idCine); // Agregar el ID del cine eliminado
                }
            }

            // Enviar una respuesta con los cines eliminados
            res.status(200).json({
                respuesta: `El proceso de eliminación se completó. Cines eliminados: ${cinesEliminados.join(", ")}` // Concatenar el mensaje
            });
        } catch {
            res.status(400).json({
                respuesta: "Error al intentar eliminar todos los cines."
            });
        }
    }



    protected static async actualiceloYa(datos: Cine, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                // Paso 1: Verificar si el cine que queremos actualizar existe
                const cineActual = await consulta.oneOrNone(SQL_CINES.GET_CINE_BY_ID, [datos.idCine]);

                if (!cineActual) {
                    // Si el cine no existe, devolver un error 404
                    res.status(404).json({ respuesta: "El cine no existe" });
                    return;
                }

                // Paso 2: Verificar si los nuevos valores son iguales a los actuales
                if (cineActual.nombreCine === datos.nombreCine && cineActual.idUbicacion === datos.idUbicacion) {
                    // Si los valores ya son los mismos, devolver un mensaje de que no hay cambios
                    res.status(200).json({ respuesta: "El cine ya está actualizado con esos datos" });
                    return;
                }

                // Paso 3: Verificar si hay otro cine con el mismo nombre y ubicación, pero diferente ID
                const cineDuplicado = await consulta.oneOrNone(SQL_CINES.CHECK_IF_EXISTS_ANOTHER_ID, [datos.nombreCine, datos.idUbicacion, datos.idCine]);

                if (cineDuplicado && cineDuplicado.existe > 0) {
                    // Si hay duplicado, devolver un error 409 indicando conflicto
                    res.status(409).json({ respuesta: "El cine ya existe en esa ubicación" });
                    return;
                }

                // Paso 4: Si todo está bien, proceder con la actualización
                await consulta.none(SQL_CINES.UPDATE, [datos.idCine, datos.idUbicacion, datos.nombreCine]);
                res.status(200).json({ actualizado: "ok" });
            })
            .catch((miError) => {
                // console.error(miError);
                res.status(400).json({ respuesta: "Error al actualizar el cine", detalle: miError.message || "Error desconocido" });
            });
    }

    protected static async actualizacionMasiva(nuevosDatos: Cine, letraInicial: string, res: Response): Promise<any> {
        try {
            // Definir el patrón de búsqueda (ej. todos los nombres que empiezan con 'A')
            const patronBusqueda = `${letraInicial}%`; //letra incial

            // Ejecutar la consulta de actualización
            const resultado = await pool.result(SQL_CINES.MASIVE_UPDATE, [nuevosDatos.nombreCine, nuevosDatos.idUbicacion, patronBusqueda]); "%A"

            // Verificar si se actualizaron registros
            if (resultado.rowCount > 0) {
                res.status(200).json({
                    respuesta: "Actualización masiva realizada con éxito",
                    registrosActualizados: resultado.rowCount
                });
            } else {
                res.status(404).json({
                    respuesta: "No se encontraron cines para actualizar"
                });
            }
        } catch (miError) {
            // console.error(miError);
            res.status(400).json({
                respuesta: "Error al realizar la actualización masiva",
                detalle: miError || "Error desconocido"
            });
        }
    }
}

export default CineDAO;
