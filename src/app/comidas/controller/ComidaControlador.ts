import { Response , Request} from "express";
import ComidaDAO from "../dao/ComidaDAO";
import Comida from "../entity/Comida";

class ComidaControlador extends ComidaDAO{
    public obtenerComidas(req: Request, res: Response){
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        ComidaDAO.obtenerTodo([limit, (page - 1) * limit], res);
    }       

    public crearComida(req: Request, res: Response){
        const objComida: Comida = new Comida(0,"",0);
        objComida.nombreComida = req.body.nombreComida;
        objComida.precioComida = req.body.precioComida;
        ComidaDAO.saveOne(objComida,res);
    }
    public eliminarComida(req: Request, res: Response){
        if(isNaN(Number(req.params.idComida))){
            res.status(400).json({respouesta: "Codigo de entrada invalido"});
        }
        else{
            const num = Number(req.params.idComida);
            const objComida: Comida = new Comida(num,"",0);
            ComidaDAO.eliminarUno(objComida, res);
        }
    }
    public actualizarComida(req: Request, res: Response){
        if(isNaN(Number(req.body.idComida))){
            res.status(400).json({respouesta: "Codigo de entrada invalido"});
        }
        else{
            const num = Number(req.body.idComida);
            const objComida: Comida = new Comida(num,req.body.nombreComida,req.body.precioComida);
            ComidaDAO.actualizarUno(objComida, res)
        }   
    }
    public actualizarMuchasComidas(req: Request, res: Response){
        const objComida: Comida = new Comida(0,req.body.nombreComida,req.body.precioComida);
        ComidaDAO.actualizarMuchos(objComida, res);
    }

    public obtenerComidaPorId(req:Request, res:Response){
        if(isNaN(Number(req.params.idComida))){
            res.status(400).json({respouesta: "Codigo de entrada invalido"});
        }
        else{
            const num = Number(req.params.idComida);
            const objComida: Comida = new Comida(num,"",0);
            ComidaDAO.getOneById(objComida, res);
        }
    }
    public obtenerComidasPorNombre(req: Request, res: Response){
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const nombre = req.query.nombre_comida || ""
        ComidaDAO.obtenerMuchosPorNombre([limit, (page - 1) * limit, nombre], res);
    } 
}

const comidaControlador = new ComidaControlador();
export default comidaControlador;