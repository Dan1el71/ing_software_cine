import { Response, Request } from "express";
import CineDAO from "../dao/CineDao";
import Cine from "../entity/Cine";

class CineControlador extends CineDAO {

  public dameCine(req: Request, res: Response): void {
    const { id } = req.params; // Obtiene el ID desde los parámetros de la ruta
    const idCine = Number(id); // Convierte el ID a número
    if (isNaN(idCine)) {
      // Maneja el caso donde el ID no es un número válido
      res.status(400).json({ respuesta: "ID inválido" });
      return;
    }
    CineDAO.obtenerCine({idCine}, res); 
  }

    
    public dameCines(req: Request, res: Response): void {
        CineDAO.obtenerTodo([], res);
    }

    public eliminaCines(req: Request, res: Response): void{
        CineDAO.borraloTodoYa(res);
    }

    public cogeTuCine(req: Request, res: Response): void {
        const objCine: Cine = new Cine(0, 0, "");
        objCine.idCine = req.body.idCine;
        objCine.idUbicacion = req.body.idUbicacion;
        objCine.nombreCine = req.body.nombreCine;
        CineDAO.grabeloYa(objCine, res);
    }

    public borraTuCine(req: Request, res: Response): void {
      // Obtener idCine desde los parámetros de la ruta
      const idCine = Number(req.params.idCine);
  
      // Validar si es un número válido
      if (isNaN(idCine)) {
          res.status(400).json({ respuesta: "El código del cine no es válido" });
      } else {
          CineDAO.borreloYa(idCine, res);
      }
    }
  

    public actualizaTuCine(req: Request, res: Response): void {
        const objCine: Cine = new Cine(0, 0, "");
        objCine.idCine = req.body.idCine;
        objCine.idUbicacion = req.body.idUbicacion;
        objCine.nombreCine = req.body.nombreCine;
        CineDAO.actualiceloYa(objCine, res);
    }

    public dameCinesPaginados(req: Request, res: Response): void {
      const pagina = parseInt(req.query.page as string, 10) || 1; // Página actual, por defecto es 1
      const limite = parseInt(req.query.limit as string, 10) || 10; // Límite de resultados por página, por defecto 10
      const offset = (pagina - 1) * limite; // Calculamos el offset

      CineDAO.obtenerCinesPaginados(limite, offset, res);
  }

  public actualizaCinesMasivo(req: Request, res: Response): void {
    const objCine: Cine = new Cine(0, 0, "");
    objCine.idCine = req.body.idCine;
    objCine.idUbicacion = req.body.idUbicacion;
    objCine.nombreCine = req.body.nombreCine;
    let patronBusqueda = req.body.patronBusqueda;
    CineDAO.actualizacionMasiva(objCine, patronBusqueda ,res);
  } 
}

const cineControlador = new CineControlador();
export default cineControlador;
