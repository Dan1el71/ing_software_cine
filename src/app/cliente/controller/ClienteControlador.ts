import { Response, Request } from 'express'
import ClienteDAO from '../dao/ClienteDAO'
import Cliente from '../entity/Cliente'

class ClienteControlador extends ClienteDAO {
  public obtenerClientes(req: Request, res: Response) {
    ClienteDAO.obtenerTodos(res)
  }

  public paginationClientes(req: Request, res: Response) {
    const { page, limit } = req.query
    ClienteDAO.pagination({ page, limit }, res)
  }

  public obtenerClientePorId(req: Request, res: Response) {
    ClienteDAO.obtenerPorId(req, res)
  }

  public crearCliente(req: Request, res: Response) {
    const obj: Cliente = new Cliente(0, '', 0, new Date(), 0, true)

    obj.idPersona = req.body.idPersona
    obj.nombrePersona = req.body.nombrePersona
    obj.numeroIdentidad = req.body.numeroIdentidad
    obj.fechaNacPersona = req.body.fechaNacPersona
    obj.idUbicacion = req.body.idUbicacion

    ClienteDAO.crear(obj, res)
  }

  public actualizarCliente(req: Request, res: Response) {
    const obj: Cliente = new Cliente(0, '', 0, new Date(), 0, true)

    obj.idPersona = req.body.idPersona
    obj.nombrePersona = req.body.nombrePersona
    obj.fechaNacPersona = req.body.fechaNacPersona
    obj.idUbicacion = req.body.idUbicacion

    ClienteDAO.actualizar(obj, res)
  }

  public eliminarCliente(req: Request, res: Response) {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ respuesta: 'Y el código mi vale?' })
    }
    const id = Number(req.params.id)
    const obj: Cliente = new Cliente(id, '', 0, new Date(), 0, true)

    ClienteDAO.eliminar(obj, res)
  }

  public masiveUpdate(req: Request, res: Response) {
    const { search } = req.query
    ClienteDAO.masiveUpdate({ search }, res)
  }
}

export default new ClienteControlador()
