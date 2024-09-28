import Persona from './Persona'

class Cliente extends Persona {
  public idPersona: number

  constructor(
    idPersona: number,
    nombre: string,
    numeroIdentidad: number,
    fechaNacimiento: Date,
    ubicacion: number,
    estado: boolean
  ) {
    super(
      idPersona,
      nombre,
      numeroIdentidad,
      fechaNacimiento,
      ubicacion,
      estado
    )
    this.idPersona = idPersona
  }
}

export default Cliente
