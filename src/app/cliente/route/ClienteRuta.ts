import { Router } from 'express'
import ClienteControlador from '../controller/ClienteControlador'

class ClienteRuta {
  public apiRutaCliente: Router

  constructor() {
    this.apiRutaCliente = Router()
    this.apiRutaCliente.get('/getLocations', ClienteControlador.obtenerUbicaciones)
    this.apiRutaCliente.get('/getall', ClienteControlador.obtenerClientes)
    this.apiRutaCliente.get(
      '/pagination',
      ClienteControlador.paginationClientes
    )
    this.apiRutaCliente.get('/:id', ClienteControlador.obtenerClientePorId)
    this.apiRutaCliente.post('/add', ClienteControlador.crearCliente)
    this.apiRutaCliente.put('/update', ClienteControlador.actualizarCliente)
    this.apiRutaCliente.put('/masiveUpdate', ClienteControlador.masiveUpdate)
    this.apiRutaCliente.delete('/masiveDelete', ClienteControlador.masiveDelete)
    this.apiRutaCliente.delete(
      '/delete/:id',
      ClienteControlador.eliminarCliente
    )
  }
}

export const apiClienteRuta = new ClienteRuta().apiRutaCliente
