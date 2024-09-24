import { Response , Request} from "express";
import ComidaDAO from "../dao/ComidaDAO";
import Comida from "../entity/Comida";

class ComidaControlador extends ComidaDAO{
    public obtenerComidas(req: Request, res: Response){
        ComidaDAO.obtenerTodo([], res);
    }

    public crearComida(req: Request, res: Response){
        const objComida: Comida = new Comida(0,"");
        objComida.nombreComida = req.body.nombreComida;
        ComidaDAO.saveOne(objComida,res);
    }
    public eliminarComida(req: Request, res: Response){
        if(isNaN(Number(req.params.idComida))){
            res.status(400).json({respouesta: "Codigo de entrada invalido"});
        }
        else{
            const num = Number(req.params.idComida);
            const objComida: Comida = new Comida(num,"");
            ComidaDAO.eliminarUno(objComida, res);
        }
    }
    public actualizarComida(req: Request, res: Response){
        if(isNaN(Number(req.body.idComida))){
            res.status(400).json({respouesta: "Codigo de entrada invalido"});
        }
        else{
            const num = Number(req.body.idComida);
            const objComida: Comida = new Comida(num,req.body.nombreComida);
            ComidaDAO.actualizarUno(objComida, res)
        }
    }
}

const comidaControlador = new ComidaControlador();
export default comidaControlador;