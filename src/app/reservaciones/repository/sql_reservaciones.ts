export const SQL_RESERVACIONES = ({
    GET_ALL: "SELECT r.id_reservacion, r.id_cliente, r.id_silla, r.id_horario, r.precio FROM reservaciones r",
    ADD: "INSERT INTO reservaciones(id_cliente, id_silla, id_horario, precio) VALUES ($1, $2, $3, $4) RETURNING id_reservacion",
    HOW_MANY: "SELECT COUNT (id_reservacion) as existe FROM reservaciones WHERE id_cliente = $1",
    DELETE: "DELETE FROM reservaciones WHERE id_reservacion = $1",
    UPDATE: "UPDATE reservaciones set id_cliente = $2, id_silla = $3, id_horario = $4, precio = $5 WHERE id_reservacion = $1 RETURNING id_reservacion",
    EXIST: "SELECT COUNT (id_reservacion) as existe FROM reservaciones WHERE id_silla = $1 AND id_horario = $2",
    PAGINATION: "SELECT r.id_reservacion, p.nombre_persona, r.id_silla, r.id_horario, r.precio FROM reservaciones r JOIN Personas p ON r.id_cliente = p.id_persona ORDER BY r.id_reservacion LIMIT $1 OFFSET $2",
    UPADTE_MASIVO: "UPDATE reservaciones set precio = (precio::numeric + $1)::money WHERE precio::text LIKE $2"
})