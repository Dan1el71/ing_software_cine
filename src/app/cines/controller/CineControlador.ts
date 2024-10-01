import { Response, Request } from "express";
import CineDAO from "../dao/CineDao";
import Cine from "../entity/Cine";

class CineControlador extends CineDAO {
    
    public dameCines(req: Request, res: Response): void {
        CineDAO.obtenerTodo([], res);
    }

    public cogeTuCine(req: Request, res: Response): void {
        const objCine: Cine = new Cine(0, 0, "");
        objCine.idCine = req.body.idCine;
        objCine.idUbicacion = req.body.idUbicacion;
        objCine.nombreCine = req.body.nombreCine;
        CineDAO.grabeloYa(objCine, res);
    }

    public borraTuCine(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idCine))) {
            res.status(400).json({ respuesta: "El código del cine no es válido" });
        } else {
            const codiguito = Number(req.params.idCine);
            const objCine: Cine = new Cine(codiguito, 0, "");
            CineDAO.borreloYa(objCine, res);
        }
    }

    public actualizaTuCine(req: Request, res: Response): void {
        const objCine: Cine = new Cine(0, 0, "");
        objCine.idCine = req.body.idCine;
        objCine.idUbicacion = req.body.idUbicacion;
        objCine.nombreCine = req.body.nombreCine;
        CineDAO.actualiceloYa(objCine, res);
    }
}

const cineControlador = new CineControlador();
export default cineControlador;
