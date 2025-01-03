import { Response } from "express";
import { SQL_CARTELERAS } from "../repository/sql_carteleras";
import pool from "../../../config/connection/dbConnection";
import PeliculaCartelera from "../entity/PeliculaCartelera";

class PeliculaCarteleraDAO {
  protected static async obtenerTodo(params: any, res: Response) {
    await pool
    .result(SQL_CARTELERAS.GET_ALL, params)
    .then((resultado) => {
        res.status(200).json(resultado.rows);
    }).catch((miErrror) => {
        //console.log(miErrror);
        res.status(400).json({respuesta: "Error al obtener la información de las carteleras"});
    });
  }

  protected static async obtenerUna(datos: PeliculaCartelera, res: Response) {
    await pool
    .result(SQL_CARTELERAS.GET_ONE, [datos.idPeliculaCartelera])
    .then((resultado) => {
        res.status(200).json(resultado.rows);
    }).catch((miErrror) => {
        //console.log(miErrror);
        res.status(400).json({respuesta: "Error al obtener la información de las carteleras"});
    });
  }

  protected static async grabeloYa(datos: PeliculaCartelera, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        const cubi = await consulta.any(SQL_CARTELERAS.EXIST, 
          [ datos.idCine, datos.idPelicula, datos.fechaInicio, datos.fechaFinal]);

        if(cubi.length == 0){
          queHacer = 2;
          respuBase = await consulta.one(SQL_CARTELERAS.ADD, 
            [ datos.idCine, datos.idPelicula, datos.fechaInicio, datos.fechaFinal]);
        }
        return {queHacer, respuBase}
      })
      .then(({ queHacer, respuBase }) => {
        switch (queHacer){
          case 1:
            res.status(400).json({respuesta: "compita ya existe la cartelera ;)"});
            break;
          default:
            res.status(200).json(respuBase);
        }
      })
      .catch((miError: any) => {
        //console.log(miError);
        res.status(400).json({respuesta: "Se totió mano"})
      });
  }
  
  protected static async borreloYa(datos: PeliculaCartelera, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let respuBase: any;
        let queHacer = 1;
        const cubi = await consulta.one(SQL_CARTELERAS.EXIST_ID, [datos.idPeliculaCartelera]);
        if(cubi.exist == 1){
          //queHacer = 2;
          //const cubi2 = await consulta.one(SQL_CARTELERAS.EXIST_OTHER_TABLE, [datos.idPeliculaCartelera]);
          //if(cubi2.exist != 0){
            queHacer = 3;
            respuBase = await consulta.result(SQL_CARTELERAS.DELETE, [datos.idPeliculaCartelera]);
          //}  
        }
        return {queHacer, respuBase}
      })
      .then(({queHacer, respuBase}) => {
        switch (queHacer){
          case 1:
            res.status(400).json({respuesta: "compita no puedes eliminar algo que no existe"});
            break;
          case 2:
            res.status(400).json({respuesta: "no creo que lo que piensas hacer sea una buena idea..."})
            break
          default:
            res.status(200).json({
              respuesta: 'La Cartelera se eliminó con éxito',
              info: respuBase.rowCount});
        }
      })
      .catch((miError) => {
        //console.log(miError)
        res.status(400).json({ respuesta: 'Error al eliminar la Cartelera' })
      });
  }

  protected static async borreloSinMiedo(params: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let respuBase: any;
        respuBase = await consulta.result(SQL_CARTELERAS.DELETE_ALL, []);
        return respuBase
      })
      .then((respuBase) => {
        res.status(200).json({ respuesta: 'Compita usted suda frio ' })
      })
      .catch((miError) => {
        //console.log(miError)
        res.status(400).json({ respuesta: 'Pailas, al eliminar todo' })
      });
  }

  protected static async actualiceloYa(datos: PeliculaCartelera, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let respuBase: any
        respuBase = await consulta.none(SQL_CARTELERAS.UPDATE, [
          datos.idPeliculaCartelera,
          datos.idPelicula,
          datos.idCine,
          datos.fechaInicio, datos.fechaFinal])
        
        return { respuBase }
      })
      .then((respuBase) => {
        res.status(200).json({ actualizado: 'ok' })
      })
      .catch((miError) => {
        //console.log(miError)
        res.status(400).json({ respuesta: 'Pailas, sql totiado' })
      });
  }

  protected static async actualiceMasivo(datos: PeliculaCartelera, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let respuBase: any
        respuBase = await consulta.result(SQL_CARTELERAS.UPDATE_MASIVE, [
          datos.idPeliculaCartelera,
          datos.idPelicula,
          datos.idCine,
          datos.fechaInicio, datos.fechaFinal])
        
        return respuBase
      })
      .then((respuBase) => {
        res.status(200).json({ 
          actualizado: 'ok',
          filasAfectadas: respuBase.rowCount})
      })
      .catch((miError) => {
        //console.log(miError)
        res.status(400).json({ respuesta: 'Pailas, sql totiado' })
      });
  }

  protected static async actualiceMasivoIdCine(datos: PeliculaCartelera, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let respuBase: any
        respuBase = await consulta.result(SQL_CARTELERAS.UPDATE_MASIVE2, [
          datos.idCine])
        
        return respuBase
      })
      .then((respuBase) => {
        res.status(200).json({ 
          actualizado: 'ok',
          filasAfectadas: respuBase.rowCount})
      })
      .catch((miError) => {
        //console.log(miError)
        res.status(400).json({ respuesta: 'Pailas, sql totiado' })
      });
  }

  protected static async paginacion([limit, page]: number[], res: Response): Promise<any> {
    const offset = (page - 1) * limit;
    await pool
    .result(SQL_CARTELERAS.PAGINATION, [limit, offset])
    .then((resultado) => {
      res.status(200).json(resultado.rows)
    })
    .catch((miError) => {
      //console.log(miError);
      res.status(400).json({respuesta:"uy se esmigajó al paginar carteleras"})
    });
  }

}

export default PeliculaCarteleraDAO;