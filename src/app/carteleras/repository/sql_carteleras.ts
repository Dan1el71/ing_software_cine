export const SQL_CARTELERAS = ({
    GET_ALL: "SELECT pc.id_pelicula_cartelera, pc.nombre_pelicula, pc.nombre_cine, pc.fecha_inicio, pc.fecha_final \
                FROM peliculas_carteleras pc",
               
    ADD: "INSERT INTO peliculas_carteleras(id_cine, id_pelicula, fecha_inicio, fecha_final) \
    VALUES($1,$2,$3,$4) RETURNING id_pelicula_cartelera",
    
    DELETE: "DELETE FROM peliculas_carteleras WHERE id_pelicula_cartelera = $1",

    UPDATE: "UPDATE peliculas_carteleras set id_cine = $2, id_pelicula = $3, \
            fecha_inicio = $4, fecha_final = $5 WHERE id_pelicula_cartelera  = $1"
    
})