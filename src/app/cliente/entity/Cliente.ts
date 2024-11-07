class Cliente {
  idCliente?: number
  nombreCliente: String
  numeroIdentidad: String
  estado: boolean
  ubicacion: String
  fechaNacimiento: Date

  constructor(
    idCliente: number,
    nombreCliente: String,
    numeroIdentidad: String,
    estado: boolean,
    ubicacion: String,
    fechaNacimiento: Date
  ) {
    this.idCliente = idCliente
    this.nombreCliente = nombreCliente
    this.numeroIdentidad = numeroIdentidad
    this.estado = estado
    this.ubicacion = ubicacion
    this.fechaNacimiento = fechaNacimiento
  }
}

export default Cliente
