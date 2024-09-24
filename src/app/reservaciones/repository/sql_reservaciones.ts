export const SQL_RESERVACIONES = ({
    GET_ALL: "SELECT r.id_reservacion, r.id_cliente, r.id_silla, r.id_horario, r.precio FROM reservaciones r",
    ADD: "INSERT INTO reservaciones(id_cliente, id_silla, id_horario, precio) VALUES ($1, $2, $3, $4) RETURNING id_reservacion",
    HOW_MANY: "SELECT COUNT (id_reservacion) as existe FROM reservaciones WHERE id_reservacion = $1",
    DELETE: "DELETE FROM reservaciones WHERE id_reservacion = $1",
    UPDATE: "UPDATE reservaciones set id_cliente = $2, id_silla = $3, id_horario = $4, precio = $5 WHERE id_reservacion = $1 RETURNING id_reservacion"
})