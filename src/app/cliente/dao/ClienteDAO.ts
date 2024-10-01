import { Response } from 'express'
import pool from '../../../config/connection/dbConnection'
import { SQL_CLIENTES } from '../repository/sql_clientes'
import Cliente from '../entity/Cliente'

class ClienteDAO {
  protected static async obtenerTodos(res: Response) {
    await pool
      .result(SQL_CLIENTES.GET_ALL)
      .then((resultado) => {
        res.status(200).json(resultado.rows)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          respuesta: 'Error al obtener la información de los clientes',
        })
      })
  }

  protected static async obtenerPorId(req: any, res: Response) {
    const id = parseInt(req.params.id)
    await pool
      .result(SQL_CLIENTES.GET_BY_ID, [id])
      .then((resultado) => {
        res.status(200).json(resultado.rows)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          respuesta: 'Error al obtener la información del cliente',
        })
      })
  }

  protected static async pagination(data: any, res: Response) {
    const page = parseInt(data.page) || 1
    const limit = parseInt(data.limit) || 10
    const offset = (page - 1) * limit

    await pool
      .result(SQL_CLIENTES.PAGINATION, [limit, offset])
      .then((resultado) => {
        res.status(200).json(resultado.rows)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          respuesta: 'Error al obtener la información de los clientes',
        })
      })
  }

  protected static async masiveUpdate(data: any, res: Response) {
    await pool
      .task(async (query) => {
        const search = data.search || ''
        const clients = await query.any(SQL_CLIENTES.SEARCH, [search])

        if (clients.length === 0) {
          throw new Error('No se encontraron clientes')
        }

        for (const client of clients) {
          const status = !client.state

          await query.any(SQL_CLIENTES.UPDATE_STATUS, [
            status,
            client.idPersona,
          ])
        }

        return clients
      })
      .then((data) => {
        res.status(200).json({
          respuesta: 'Actualización masiva realizada',
          resultados: data,
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          respuesta: 'Error al actualizar los clientes',
          mensaje: err.detail,
        })
      })
  }

  protected static async crear(data: Cliente, res: Response) {
    await pool
      .task(async (consulta) => {
        const { nombrePersona, numeroIdentidad, fechaNacPersona, idUbicacion } =
          data

        const userExists = await consulta.oneOrNone(
          SQL_CLIENTES.COUNT_BY_ID_NUMBER,
          numeroIdentidad.toString()
        )

        if (userExists.existe !== '0') {
          console.log('Entra aca')
          throw new Error('El cliente ya existe')
        }

        const persona = await consulta.one(SQL_CLIENTES.INSERT_PERSONA, [
          nombrePersona,
          numeroIdentidad,
          fechaNacPersona,
          idUbicacion,
        ])

        await consulta.none(SQL_CLIENTES.INSERT_CLIENTE, [persona.idPersona])

        return persona
      })
      .then((resultado: any) => {
        console.log(resultado)
        res.status(201).json({
          respuesta: 'Cliente creado exitosamente',
          idCliente: resultado.id_persona,
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          respuesta: 'Error al crear el cliente',
          mensaje: err.message,
        })
      })
  }

  protected static async actualizar(data: Cliente, res: Response) {
    await pool
      .task(async (consulta) => {
        const { idPersona, nombrePersona, fechaNacPersona, idUbicacion } = data
        const clienteExiste = await this.clienteExiste(idPersona)

        if (!clienteExiste) {
          throw new Error('El cliente no existe')
        }

        await consulta.none(SQL_CLIENTES.UPDATE, [
          nombrePersona,
          fechaNacPersona,
          idUbicacion,
          idPersona,
        ])
      })
      .then(() => {
        res.status(200).json({
          respuesta: 'Cliente actualizado exitosamente',
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          respuesta: 'Error al actualizar el cliente',
          mensaje: err.detail,
        })
      })
  }

  protected static async eliminar(data: Cliente, res: Response) {
    await pool
      .task(async (consulta) => {
        const id = data.idPersona
        const clienteExiste = await this.clienteExiste(id)

        if (!clienteExiste) {
          throw new Error('El cliente no existe')
        }

        await consulta.none(SQL_CLIENTES.DELETE_CLIENTE, [id])
        await consulta.none(SQL_CLIENTES.DELETE_PERSONA, [id])
      })
      .then(() => {
        res.status(200).json({
          respuesta: 'Cliente eliminado exitosamente',
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          respuesta: 'Error al eliminar el cliente',
          mensaje: err.detail,
        })
      })
  }

  protected static async masiveDelete(data: any, res: Response) {
    await pool
      .task(async (consulta) => {
        const search = data.search || ''
        const clients = await consulta.any(SQL_CLIENTES.SEARCH, [search])

        if (clients.length === 0) {
          throw new Error('No se encontraron clientes')
        }

        for (const client of clients) {
          await consulta.none(SQL_CLIENTES.DELETE_CLIENTE, [client.idPersona])
          await consulta.none(SQL_CLIENTES.DELETE_PERSONA, [client.idPersona])
        }

        return clients
      })
      .then((data) => {
        res.status(200).json({
          respuesta: 'Eliminación masiva realizada',
          resultados: data,
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          respuesta: 'Error al eliminar los clientes',
          mensaje: err.detail,
        })
      })
  }

  private static async clienteExiste(id: number): Promise<boolean> {
    const resultado = await pool.one(SQL_CLIENTES.COUNT, [id])
    return resultado.existe > 0
  }
}

export default ClienteDAO
