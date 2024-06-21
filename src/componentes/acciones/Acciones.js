import { useState } from "react";
import { Grid, Tooltip, IconButton } from "@mui/material";
import { PlantillaModal } from "../plantillaPagina/PlantillaModal";
import { BsPencil, BsTrash } from "react-icons/bs";
import ModalEliminar from "../plantillaPagina/ModalEliminar";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { peticionSuspensionProducto } from "../../Utilidades/FetchApis/PeticionesBD";
import { useGlobalAlert } from "../../hooks/useGlobalAlert";

/**
 * Componente que muestra las acciones disponibles para un producto.
 * @param {boolean} motos - Indica si el producto es una motocicleta.
 * @param {Object} producto - Información del producto.
 * @param {Function} obtenerProductos - Función para obtener la lista de productos actualizada.
 * @param {Object} productoClasificado - Información clasificada del producto.
 * @returns {JSX.Element} El componente de acciones del producto.
 */
const Acciones = ({
    motos,
    producto,
    obtenerProductos,
    productoClasificado,
    pagina,
    tamañoPagina,
}) => {
    const { popAlert } = useGlobalAlert();
    const [suspender, setSuspender] = useState(producto["Suspendido"]);
    const [modificar, setModificar] = useState(false);
    const [eliminar, setEliminar] = useState(false);

    /**
     * Realiza la suspensión o levantamiento de suspensión del producto.
     */
    const suspensionProducto = async () => {
        try {
            const respuesta = await peticionSuspensionProducto(
                motos ? "Motos" : "Repuestos",
                motos
                    ? {
                          Nombre: producto["Nombre"],
                          Modelo: producto["Modelo"],
                          Suspendido: producto["Suspendido"],
                      }
                    : {
                          "Código de parte": producto["Código de parte"],
                          Suspendido: producto["Suspendido"],
                      }
            );

            if (!respuesta.ok) {
                popAlert(
                    "Hubo un error al cambiar la suspensión del producto.",
                    "error"
                );
            }

            const contenido = await respuesta.json();
            if (contenido === "Hecho") {
                setSuspender(!suspender);
            }
        } catch (err) {
            popAlert(
                "Hubo un error al cambiar la suspensión del producto.",
                "error"
            );
        }
    };

    /**
     * Maneja el evento de suspender o levantar suspensión del producto.
     */
    const manejarSuspender = () => {
        suspensionProducto();
        if (suspender) {
            popAlert(
                "Se levantó correctamente la suspensión del producto.",
                "success"
            );
        } else {
            popAlert("Se suspendió correctamente el producto.", "success");
        }
    };

    return (
        <>
            {modificar && (
                <PlantillaModal
                    abierto={modificar}
                    setAbierto={setModificar}
                    crear={false}
                    campos={productoClasificado}
                    tipoProducto={motos ? "Motos" : "Repuestos"}
                    obtenerProductos={obtenerProductos}
                    pagina = {pagina}
                    tamañoPagina = {tamañoPagina}
                />
            )}
            {eliminar && (
                <ModalEliminar
                    abierto={eliminar}
                    setAbierto={setEliminar}
                    motos={motos}
                    producto={producto}
                    obtenerProductos={obtenerProductos}
                    pagina = {pagina}
                    tamañoPagina = {tamañoPagina}
                />
            )}
            <Grid container columns={3} spacing={1}>
                {suspender && (
                    <Grid item xs={0.85} align="center">
                        <Tooltip
                            title="Haz click para levantar suspension del producto"
                            arrow
                        >
                            <IconButton
                                color="primary"
                                onClick={manejarSuspender}
                            >
                                <FaLock />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}
                {!suspender && (
                    <Grid item xs={0.85} align="center">
                        <Tooltip
                            title="Haz click para suspender producto"
                            arrow
                        >
                            <IconButton
                                color="primary"
                                onClick={manejarSuspender}
                            >
                                <FaLockOpen />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}
                <Grid item xs={1.1} align="center">
                    <Tooltip title="Modificar producto" arrow>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                setModificar(true);
                            }}
                        >
                            <BsPencil />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={0.85} align="center">
                    <Tooltip title="Eliminar producto" arrow>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                setEliminar(true);
                            }}
                        >
                            <BsTrash />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </>
    );
};

export default Acciones;
