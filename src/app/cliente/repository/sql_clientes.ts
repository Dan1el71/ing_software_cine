export const SQL_CLIENTES = {
  GET_ALL:
    'SELECT c.id_persona as id_cliente, p.nombre_persona as nombre_cliente,p.numero_identidad as numero_identidad ,u.nombre_ubicacion as ubicacion, p.fecha_nac_persona as fecha_nacimiento, p.state as estado\
    FROM Clientes c \
    JOIN Personas p ON c.id_persona = p.id_persona \
    JOIN Ubicaciones u ON p.id_ubicacion = u.id_ubicacion',
  COUNT_BY_ID_NUMBER:
    'SELECT COUNT (numero_identidad) as existe FROM personas p WHERE p.numero_identidad  = $1',
  COUNT:
    'SELECT COUNT (id_persona) as existe FROM clientes c WHERE c.id_persona  = $1',
  PAGINATION:
    'SELECT c.id_persona as id_cliente, p.nombre_persona as nombre_cliente, u.nombre_ubicacion as ubicacion, p.fecha_nac_persona as fecha_nacimiento, p.state as estado\
    FROM Clientes c \
    JOIN Personas p ON c.id_persona = p.id_persona \
    JOIN Ubicaciones u ON p.id_ubicacion = u.id_ubicacion \
    LIMIT $1 OFFSET $2',
  GET_BY_ID:
    'SELECT c.id_persona, p.nombre_persona, u.nombre_ubicacion, p.fecha_nac_persona, p.state\
    FROM Clientes c \
    JOIN Personas p ON c.id_persona = p.id_persona \
    JOIN Ubicaciones u ON p.id_ubicacion = u.id_ubicacion \
    WHERE c.id_persona = $1',
  INSERT_PERSONA:
    'INSERT INTO Personas (nombre_persona,numero_identidad ,fecha_nac_persona, id_ubicacion) VALUES ($1, $2, $3, $4) RETURNING id_persona',
  INSERT_CLIENTE: 'INSERT INTO Clientes (id_persona) VALUES ($1)',
  UPDATE:
    'UPDATE Personas SET nombre_persona = $1, fecha_nac_persona = $2, id_ubicacion = $3 WHERE id_persona = $4',
  UPDATE_STATUS: 'UPDATE Personas SET state = $1 WHERE id_persona = $2',
  DELETE_PERSONA: 'DELETE FROM Personas WHERE id_persona = $1 ',
  DELETE_CLIENTE: 'DELETE FROM Clientes WHERE id_persona = $1',
  SEARCH: "SELECT * FROM Personas p WHERE p.nombre_persona ILIKE $1 || '%'",
}
