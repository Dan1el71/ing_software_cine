import Persona from './Persona'

class Cliente extends Persona {
  public idPersona: number

  constructor(
    idPersona: number,
    nombre: string,
    fechaNacimiento: Date,
    ubicacion: number
  ) {
    super(idPersona, nombre, fechaNacimiento, ubicacion)
    this.idPersona = idPersona
  }
}

export default Cliente
