import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    alertTitleClasses,
} from "@mui/material";
import Item from "../item/Item";
import TablaPersonalizada from "../tablaPersonalizada/TablaPersonalizada";
import { MdAdd } from "react-icons/md";
import { PlantillaModal } from "./PlantillaModal";
import ModalCargaMasiva from "./ModalCargaMasiva";
import FiltroTabla from "./FiltroTabla";
import SyncLoader from "react-spinners/SyncLoader";

/**
 * Componente de plantilla de página.
 *
 * @param {string} nombreLista - Nombre de la lista.
 * @param {array} filas - Filas de datos.
 * @param {array} columnas - Columnas de la tabla.
 * @param {array} camposModal - Campos del modal.
 * @param {string} tipoProducto - Tipo de producto asociado.
 * @param {function} obtenerProductos - Función para obtener los productos.
 * @param {boolean} cargando - Indica si se está cargando información.
 * @param {array} columnasAFiltrar - Las columnas por las cuales se permitira filtrar.
 * @returns {JSX.Element} Componente JSX de plantilla de página.
 */
const PlantillaPagina = ({
    nombreLista,
    filas,
    columnas,
    camposModal,
    tipoProducto,
    obtenerProductos,
    cargando,
    columnasAFiltrar,
    pagina,
    tamañoPagina,
    setPagina,
    setTamañoPagina,
}) => {
    const [agregar, setAgregar] = useState(false);
    const [modalCargaMasiva, setModalCargaMasiva] = useState(false);
    const [filasFiltradas, setFilasFiltradas] = useState(filas);

    useEffect(() => {
        setFilasFiltradas(filas);
    }, [filas]);

    const keyframes = `
    @-webkit-keyframes fade-out {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @keyframes fade-out {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `;
    return (
        <>
            {agregar && (
                <PlantillaModal
                    abierto={agregar}
                    setAbierto={setAgregar}
                    crear={true}
                    campos={camposModal}
                    tipoProducto={tipoProducto}
                    obtenerProductos={obtenerProductos}
                    pagina={pagina}
                    tamañoPagina={tamañoPagina}
                />
            )}
            {modalCargaMasiva && (
                <ModalCargaMasiva
                    abierto={modalCargaMasiva}
                    setAbierto={setModalCargaMasiva}
                    tipoProducto={tipoProducto}
                    obtenerProductos={obtenerProductos}
                    pagina={pagina}
                    tamañoPagina={tamañoPagina}
                />
            )}
            <Box
                sx={{
                    minWidth: "700px",
                    height: "100%",
                    minHeight: "100vh",
                    backgroundColor: "#f1f1f1",
                    p: 4,
                }}
            >
                <Grid container>
                    <Grid item md={12}>
                        <Item>
                            <Grid container>
                                <Grid item md={8}>
                                    <Typography
                                        variant="h6"
                                        align="left"
                                        sx={{ fontWeight: "600" }}
                                    >
                                        {nombreLista}
                                    </Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setAgregar(true);
                                        }}
                                        startIcon={
                                            <MdAdd
                                                sx={{
                                                    color: "#FFF",
                                                    fontSize: "1rem",
                                                }}
                                            />
                                        }
                                    >
                                        Agregar
                                    </Button>
                                </Grid>
                                <Grid item md={2}>
                                    <Button
                                        onClick={() => {
                                            setModalCargaMasiva(true);
                                        }}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Carga Masiva
                                    </Button>
                                </Grid>
                                <Grid item md={12}>
                                    <FiltroTabla
                                        columnasAFiltrar={columnasAFiltrar}
                                        filas={filas}
                                        setFilasFiltradas={setFilasFiltradas}
                                    />
                                    {cargando && (
                                        <div>
                                            <style>{keyframes}</style>
                                            <SyncLoader
                                                margin={100}
                                                cssOverride={{
                                                    animation:
                                                        "fade-out 0.5s ease-out both",
                                                    WebkitAnimation:
                                                        "fade-out 0.5s ease-out both",
                                                }}
                                            />
                                        </div>
                                    )}
                                    {!cargando && (
                                        <TablaPersonalizada
                                            filas={filasFiltradas}
                                            columnas={columnas}
                                            pagina={pagina}
                                            tamañoPagina={tamañoPagina}
                                            setPagina={setPagina}
                                            setTamañoPagina={setTamañoPagina}
                                            obtenerProductos={obtenerProductos}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default PlantillaPagina;
