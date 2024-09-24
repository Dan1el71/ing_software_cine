export const SQL_SALAS = ({
    GET_ALL : "SELECT s.id_sala, s.capacidad, s.id_cine FROM salas s",
    ADD: "INSERT INTO salas(capacidad, id_cine) VALUES ($1, $2) RETURNING id_sala",
    HOW_MANY: "SELECT COUNT (id_sala) as existe FROM salas WHERE id_cine = $1",
    DELETE: "DELETE FROM salas WHERE id_sala = $1",
    UPDATE: "UPDATE salas set capacidad = $2, id_cine = $3 WHERE id_sala  = $1"
})