import { Response, Request } from "express";
import PeliculaCarteleraDAO from "../dao/PeliculaCarteleraDAO";
import PeliculaCartelera from "../entity/PeliculaCartelera";

class PeliculaCarteleraControlador extends PeliculaCarteleraDAO {

    public dameCarteleras(req: Request, res: Response) {
        PeliculaCarteleraDAO.obtenerTodo([],res);    
    }
}

const peliculaCarteleraControlador = new PeliculaCarteleraControlador();
export default peliculaCarteleraControlador;