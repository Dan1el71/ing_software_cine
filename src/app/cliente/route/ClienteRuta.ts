import { Router } from 'express'
import ClienteCOntrolador from '../controller/ClienteControlador'

class ClienteRuta {
  public apiRutaCliente: Router

  constructor() {
    this.apiRutaCliente = Router()
    this.apiRutaCliente.get('/', ClienteCOntrolador.obtenerClientes)
    this.apiRutaCliente.get('/:id', ClienteCOntrolador.obtenerClientePorId)
    this.apiRutaCliente.post('/', ClienteCOntrolador.crearCliente)
    this.apiRutaCliente.put('/', ClienteCOntrolador.actualizarCliente)
    this.apiRutaCliente.delete('/:id', ClienteCOntrolador.eliminarCliente)
  }
}

export const apiClienteRuta = new ClienteRuta().apiRutaCliente
