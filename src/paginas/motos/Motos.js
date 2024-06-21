import React, { useState, useEffect } from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

import { CamposMotos } from "../../Utilidades/Constantes/CamposMotosRepuestos";
import { peticionObtenerProductos } from "../../Utilidades/FetchApis/PeticionesBD";
import {
    clasificar,
    obtenerClases,
} from "../../Utilidades/funciones/funcionesAplanarDatos";

/**
 * Función que crea un objeto de datos para una moto.
 *
 * @param {string} nombre - El nombre de la moto.
 * @param {string} modelo - El modelo de la moto.
 * @param {string} categoria - La categoria de la moto.
 * @param {React.Component} acciones - Componente de acciones para la moto.
 * @returns {object} - Objeto de datos para la moto.
 */
function crearDatos(nombre, modelo, categoria, acciones) {
    return {
        Nombre: nombre,
        Modelo: modelo,
        Categoría: categoria,
        Acciones: acciones,
    };
}

const columnas = ["Nombre", "Modelo", "Categoría", "Acciones"];

/**
 * Componente de la página de Motos.
 */
const Motos = () => {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(0);
    const [tamañoPagina, setTamañoPagina] = useState(5);

    /**
     * Función asincrónica que obtiene las motos de la base de datos.
     */
    const obtenerMotos = async (pagina = 0, tamañoPagina = 5) => {
        try {
            setCargando(true);
            const respuesta = await peticionObtenerProductos(
                "Motos",
                pagina,
                tamañoPagina
            );

            if (!respuesta.ok) {
                throw new Error(
                    `Ocurrio un error. Estado de respuesta: ${respuesta.status}`
                );
            }

            const contenido = await respuesta.json();
            const motos = contenido.map((moto) => {
                return crearDatos(
                    moto["Nombre"],
                    moto["Modelo"],
                    moto["Categoría"],
                    <Acciones
                        motos={true}
                        producto={moto}
                        obtenerProductos={obtenerMotos}
                        productoClasificado={clasificar(
                            obtenerClases(CamposMotos),
                            moto
                        )}
                        pagina={pagina}
                        tamañoPagina={tamañoPagina}
                    />
                );
            });
            setDatos(motos);
            setCargando(false);
        } catch (err) {
            console.log(err);
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerMotos();
    }, []);

    return (
        <>
            <PlantillaPagina
                nombreLista="Lista de Motos"
                filas={datos}
                columnas={columnas}
                camposModal={CamposMotos}
                tipoProducto={"Motos"}
                obtenerProductos={obtenerMotos}
                cargando={cargando}
                columnasAFiltrar={[columnas[0], columnas[1], columnas[2]]}
                pagina={pagina}
                tamañoPagina={tamañoPagina}
                setPagina={setPagina}
                setTamañoPagina={setTamañoPagina}
            />
        </>
    );
};

export default Motos;
