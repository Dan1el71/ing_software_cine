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
    const obj: Cliente = new Cliente(0, '', '', true, '', new Date())

    obj.idCliente = req.body.idCliente
    obj.nombreCliente = req.body.nombreCliente
    obj.numeroIdentidad = req.body.numeroIdentidad
    obj.fechaNacimiento = req.body.fechaNacimiento
    obj.ubicacion = req.body.ubicacion

    ClienteDAO.crear(obj, res)
  }

  public actualizarCliente(req: Request, res: Response) {
    const obj: Cliente = new Cliente(0, '', '', true, '', new Date())

    obj.idCliente = req.body.idPersona
    obj.nombreCliente = req.body.nombrePersona
    obj.fechaNacimiento = req.body.fechaNacPersona
    obj.ubicacion = req.body.idUbicacion

    ClienteDAO.actualizar(obj, res)
  }

  public eliminarCliente(req: Request, res: Response) {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ respuesta: 'Y el código mi vale?' })
    }
    const id = Number(req.params.id)
    const obj: Cliente = new Cliente(id, '', '', true, '', new Date())

    ClienteDAO.eliminar(obj, res)
  }

  public masiveUpdate(req: Request, res: Response) {
    const { search, set } = req.query
    ClienteDAO.masiveUpdate({ search, set }, res)
  }

  public masiveDelete(req: Request, res: Response) {
    const { search } = req.query
    ClienteDAO.masiveDelete({ search }, res)
  }
}

export default new ClienteControlador()
