import { Response, Request } from "express";
import SalaDAO from "../dao/SalaDAO";
import Sala from "../entity/Sala";

class SalaControlador extends SalaDAO{
    
    public dameSalas(req: Request, res: Response) {
        SalaDAO.obtenerTodo([],res);    
    }

    public cogeTuSala(req: Request, res: Response): void{
        const objCubi: Sala = new Sala(0,0,0);
        objCubi.idSala = req.body.idSala;
        objCubi.capacidadSala = req.body.capacidadSala;
        objCubi.idCine = req.body.idCine;
        SalaDAO.grabeloYa(objCubi, res);
    }

    public borraTuSala(req: Request, res: Response){
        if(isNaN(Number(req.params.idSala))){
            res.status(400).json({respouesta: "Y el código mi vale?"});
        }else{
            const codiguito  = Number(req.params.idSala);
            const objCubi: Sala = new Sala(codiguito,0,0);
            SalaDAO.borreloYa(objCubi, res);
        }
    }

    public actualizaTuSala(req: Request, res: Response){
        const objCubi: Sala = new Sala(0,0,0);
        objCubi.idSala = req.body.idSala;
        objCubi.capacidadSala = req.body.capacidadSala;
        objCubi.idCine = req.body.idCine;
        SalaDAO.actualiceloYa(objCubi, res);
    }
}

const salaControlador = new SalaControlador(); 
export default salaControlador;