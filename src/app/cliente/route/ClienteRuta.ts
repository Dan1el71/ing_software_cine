import { Router } from 'express'
import ClienteCOntrolador from '../controller/ClienteControlador'

class ClienteRuta {
  public apiRutaCliente: Router

  constructor() {
    this.apiRutaCliente = Router()
    this.apiRutaCliente.get('/getall', ClienteCOntrolador.obtenerClientes)
    this.apiRutaCliente.get("/pagination", ClienteCOntrolador.paginationClientes)
    this.apiRutaCliente.get('/:id', ClienteCOntrolador.obtenerClientePorId)
    this.apiRutaCliente.post('/add', ClienteCOntrolador.crearCliente)
    this.apiRutaCliente.put('/update', ClienteCOntrolador.actualizarCliente)
    this.apiRutaCliente.delete('/delete/:id', ClienteCOntrolador.eliminarCliente)
  }
}

export const apiClienteRuta = new ClienteRuta().apiRutaCliente
