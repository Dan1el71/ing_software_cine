import Persona from './Persona'

class Cliente extends Persona {
  public idPersona: number

  constructor(
    idPersona: number,
    nombre: string,
    numeroIdentidad: number,
    fechaNacimiento: Date,
    ubicacion: number
  ) {
    super(idPersona, nombre, numeroIdentidad, fechaNacimiento, ubicacion)
    this.idPersona = idPersona
  }
}

export default Cliente
