export const SQL_CARTELERAS = ({
    GET_ALL: "SELECT pc.id_pelicula_cartelera, p.nombre_pelicula, c.nombre_cine, pc.fecha_inicio, pc.fecha_final \
                FROM peliculas_carteleras pc \
                JOIN peliculas p ON pc.id_pelicula = p.id_pelicula \
                JOIN cines c ON pc.id_cine = c.id_cine;"
    
})