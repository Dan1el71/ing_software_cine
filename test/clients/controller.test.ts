import { describe, test, expect, afterAll, beforeAll } from '@jest/globals'
import request, { Response } from 'supertest'
import Cliente from '../../src/app/cliente/entity/Cliente'
import { API_URL } from '../config'

const app = API_URL + '/cliente'

describe('GET /clients', () => {
  let getClientResponse: Response

  beforeAll(async () => {
    getClientResponse = await request(app).get('/getAll').send()
  })

  test('Should return 200 status code', () => {
    const { statusCode } = getClientResponse

    expect(statusCode).toBe(200)
  })

  test('Should return a non-empty array', () => {
    const { body } = getClientResponse

    expect(body.length).toBeGreaterThan(0)
  })

  test('First client should have idCliente property', () => {
    const { body } = getClientResponse
    expect(body[0]).toHaveProperty('idCliente')
  })
})

describe('GET /locations', () => {
  let getLocationsResponse: Response

  beforeAll(async () => {
    getLocationsResponse = await request(app).get('/getLocations').send()
  })

  test('Should return 200 status code', () => {
    const { statusCode } = getLocationsResponse
    expect(statusCode).toBe(200)
  })

  test('Should return a non-empty array', () => {
    const { body } = getLocationsResponse
    expect(body.length).toBeGreaterThan(0)
  })

  test('First location should have idUbicacion property', () => {
    const { body } = getLocationsResponse
    expect(body[0]).toHaveProperty('idUbicacion')
  })

  test('First location should have nombreUbicacion property', () => {
    const { body } = getLocationsResponse
    expect(body[0]).toHaveProperty('nombreUbicacion')
  })
})

describe('GET /pagination', () => {
  let getPaginationResponse: Response
  let page = 1
  let limit = 10

  beforeAll(async () => {
    getPaginationResponse = await request(app).get('/pagination').send({
      page,
      limit,
    })
  })

  test('Should return 200 status code', () => {
    const { statusCode } = getPaginationResponse
    expect(statusCode).toBe(200)
  })

  test('Should return a non-empty array', () => {
    const { body } = getPaginationResponse
    expect(body.data.length).toBeGreaterThan(0)
  })

  test('Should return currentPage, totalPages and limit properties', () => {
    const { body } = getPaginationResponse
    expect(body).toHaveProperty('currentPage')
    expect(body).toHaveProperty('totalPages')
    expect(body).toHaveProperty('limit')
  })

  test('First client should have idCliente property', () => {
    const { body } = getPaginationResponse
    expect(body.data[0]).toHaveProperty('idCliente')
  })

  test('Should return the correct currentPage', () => {
    const { body } = getPaginationResponse
    expect(body.currentPage).toBe(page)
  })

  test('Should return the correct totalPages', () => {
    const { body } = getPaginationResponse
    expect(body.totalPages).toBeGreaterThan(0)
  })

  test('Should return the correct limit', () => {
    const { body } = getPaginationResponse
    expect(body.limit).toBe(limit)
  })
})

describe('POST /clients', () => {
  let idCliente = 0
  let createResponse: Response
  let getByIdResponse: Response
  const idNumber = getRandomIdNumber()
  const { nombreCliente, fechaNacimiento, estado, ubicacion, numeroIdentidad } =
    new Cliente(10, 'John', idNumber, true, '10', new Date())

  beforeAll(async () => {
    createResponse = await request(app).post('/add').send({
      nombreCliente,
      fechaNacimiento,
      estado,
      ubicacion,
      numeroIdentidad,
    })
    idCliente = createResponse.body.idCliente.idPersona

    getByIdResponse = await request(app).get(`/${idCliente}`).send()
  })

  test('Should return 201 status code', () => {
    const { statusCode } = createResponse
    expect(statusCode).toBe(201)
  })

  test('Should return a successfull response', () => {
    const { body } = createResponse
    expect(body.respuesta).toBe('Cliente creado exitosamente')
  })

  test('Should return the created client ID', () => {
    const { body } = createResponse
    expect(body.idCliente).toHaveProperty('idPersona')
  })

  test('Should find the created client', () => {
    const { body } = getByIdResponse
    expect(body[0].idCliente).toBe(idCliente)
  })

  test('Should have the same attributes as the created client', () => {
    const { body } = getByIdResponse
    expect(body[0]).toMatchObject({
      nombreCliente,
      numeroIdentidad,
      estado,
    })
  })

  afterAll(async () => {
    await deleteClient(idCliente)
  })
})

describe('PUT /clients', () => {
  let updatedClientResponse: Response
  let findUpdatedClientResponse: Response
  let createdClientId: number
  let idNumber: string
  let newRandomIdNumber: string

  beforeAll(async () => {
    idNumber = getRandomIdNumber()
    newRandomIdNumber = getRandomIdNumber()

    const originalClient = new Cliente(
      0,
      'John',
      idNumber,
      true,
      '10',
      new Date()
    )

    await request(app)
      .post('/add')
      .send(originalClient)
      .then((response) => {
        createdClientId = response.body.idCliente.idPersona
      })

    const updatedClient = {
      ...originalClient,
      nombreCliente: 'UpdatedClient',
      estado: false,
      numeroIdentidad: newRandomIdNumber,
      idCliente: createdClientId,
    }

    await request(app)
      .put('/update')
      .send(updatedClient)
      .then((res) => {
        updatedClientResponse = res
      })
      .catch((err) => {
        console.log(err)
      })

    await request(app)
      .get(`/${createdClientId}`)
      .send()
      .then((res) => {
        findUpdatedClientResponse = res
      })
  })

  test('Should return 200 status code', () => {
    const { statusCode } = updatedClientResponse
    expect(statusCode).toBe(200)
  })

  test('Should return the updated client ID', () => {
    const { body } = updatedClientResponse

    expect(body.respuesta).toBe('Cliente actualizado exitosamente')
  })

  test('Should find the updated client', () => {
    const { body } = findUpdatedClientResponse

    expect(body[0].idCliente).toBe(createdClientId)
  })

  test('Should have the updated attributes', () => {
    const { body } = findUpdatedClientResponse

    expect(body[0]).toMatchObject({
      nombreCliente: 'UpdatedClient',
      numeroIdentidad: newRandomIdNumber,
      estado: false,
    })
  })

  afterAll(async () => {
    await deleteClient(createdClientId)
  })
})

describe('DELETE /clients', () => {
  let deleteClienteResponse: Response
  let findDeletedClientResponse: Response
  let idCliente = 0

  beforeAll(async () => {
    const idNumber = getRandomIdNumber()
    const {
      nombreCliente,
      fechaNacimiento,
      estado,
      ubicacion,
      numeroIdentidad,
    } = new Cliente(10, 'John', idNumber, true, '10', new Date())

    await request(app)
      .post('/add')
      .send({
        nombreCliente,
        fechaNacimiento,
        estado,
        ubicacion,
        numeroIdentidad,
      })
      .then((res) => {
        idCliente = res.body.idCliente.idPersona
      })

    deleteClienteResponse = await request(app)
      .delete(`/delete/${idCliente}`)
      .send()

    findDeletedClientResponse = await request(app).get(`/${idCliente}`).send()
  })

  test('Should return 200 status code', () => {
    const { statusCode } = deleteClienteResponse
    expect(statusCode).toBe(200)
  })

  test('Should return a sucessfull response', () => {
    const { body } = deleteClienteResponse
    expect(body.respuesta).toBe('Cliente eliminado exitosamente')
  })

  test('Should not find the deleted client', () => {
    const { body } = findDeletedClientResponse
    expect(body.length).toBe(0)
  })
})

function getRandomIdNumber(): string {
  return Math.floor(Math.random() * 1000000000).toString()
}

async function deleteClient(idCliente: number) {
  await request(app).delete(`/delete/${idCliente}`).send()
}
