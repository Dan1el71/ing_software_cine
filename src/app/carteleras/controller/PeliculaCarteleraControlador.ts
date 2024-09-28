import { Response, Request } from "express";
import PeliculaCarteleraDAO from "../dao/PeliculaCarteleraDAO";
import PeliculaCartelera from "../entity/PeliculaCartelera";

class PeliculaCarteleraControlador extends PeliculaCarteleraDAO {

    public dameCarteleras(req: Request, res: Response) {
        PeliculaCarteleraDAO.obtenerTodo([],res);    
    }
    
    public cogeTuCartelera(req: Request, res: Response): void{
        if (!req.body.idCine || !req.body.idPelicula || !req.body.fechaInicio) {
            res.status(400).json({ error: "Faltan parámetros requeridos" });
   
        }else{
            const objCubi: PeliculaCartelera = new PeliculaCartelera(0,0,0,new Date(),new Date());
            objCubi.idCine = req.body.idCine;
            objCubi.idPelicula = req.body.idPelicula;
            objCubi.fechaInicio = req.body.fechaInicio;
            objCubi.fechaFinal = req.body.fechaFinal;
            PeliculaCarteleraDAO.grabeloYa(objCubi, res);
        }
    }

    public borraTuCartelera(req: Request, res: Response){
        if(isNaN(Number(req.params.idPeliculaCartelera))){
            res.status(400).json({respuesta: "Y el código mi vale?"});
        }else{
            const codiguito  = Number(req.params.idPeliculaCartelera);
            const objCubi: PeliculaCartelera = new PeliculaCartelera(codiguito,0,0,new Date(),new Date());
            PeliculaCarteleraDAO.borreloYa(objCubi, res);
        }
    }

    public actualizaTuCartelera(req: Request, res: Response){
        if (!req.body.idCine || !req.body.idPelicula || !req.body.fechaInicio) {
            res.status(400).json({ error: "Faltan parámetros requeridos" });
   
        }else{
            const objCubi: PeliculaCartelera = new PeliculaCartelera(0,0,0,new Date(),new Date());
            objCubi.idPeliculaCartelera = req.body.idPeliculaCartelera
            objCubi.idCine = req.body.idCine;
            objCubi.idPelicula = req.body.idPelicula;
            objCubi.fechaInicio = req.body.fechaInicio;
            objCubi.fechaFinal = req.body.fechaFinal;
            PeliculaCarteleraDAO.actualiceloYa(objCubi, res);
        }
    }

    public actualizaTuCarteleraMasivo(req: Request, res: Response){
        if (!req.body.idCine || !req.body.idPelicula || !req.body.fechaInicio) {
            res.status(400).json({ error: "Faltan parámetros requeridos" });
   
        }else{
            const objCubi: PeliculaCartelera = new PeliculaCartelera(0,0,0,new Date(),new Date());
            objCubi.idPeliculaCartelera = req.body.idPeliculaCartelera
            objCubi.idCine = req.body.idCine;
            objCubi.idPelicula = req.body.idPelicula;
            objCubi.fechaInicio = req.body.fechaInicio;
            objCubi.fechaFinal = req.body.fechaFinal;
            PeliculaCarteleraDAO.actualiceMasivo(objCubi, res);
        }
    }

    public paginacionDeCarteleras(req: Request, res: Response) {
        const limit = parseInt(req.query.limit as string); 
        const page = parseInt(req.query.page as string);   

        if (!isNaN(limit) && !isNaN(page) && limit > 0 && page > 0) {
            PeliculaCarteleraDAO.paginacion([limit, page], res);
        } else {
            res.status(400).json({ error: 'no puedo calcular la paginacion con esos valores' });
        }
    }

}

const peliculaCarteleraControlador = new PeliculaCarteleraControlador();
export default peliculaCarteleraControlador;