import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    AlertTitle,
} from "@mui/material";

import { useGlobalAlert } from "../../hooks/useGlobalAlert";
import { peticionEliminarProducto } from "../../Utilidades/FetchApis/PeticionesBD";

/**
 * Componente de modal para eliminar un producto.
 *
 * @param {boolean} abierto - Indica si el modal está abierto.
 * @param {function} setAbierto - Función para controlar el estado de abierto/cerrado del modal.
 * @param {boolean} motos - Indica si el producto es una moto.
 * @param {object} producto - El producto a eliminar.
 * @param {function} obtenerProductos - Función para obtener los productos.
 * @returns {JSX.Element} Componente JSX del modal de eliminación.
 */
const ModalEliminar = ({
    abierto,
    setAbierto,
    motos,
    producto,
    obtenerProductos,
    pagina,
    tamañoPagina,
}) => {
    const { popAlert } = useGlobalAlert();

    const tipo_producto = motos ? "la moto" : "el repuesto";

    /**
     * Elimina el producto de la base de datos.
     *
     * @returns {Promise<void>} Promesa que se resuelve cuando se elimina correctamente el producto.
     */
    const eliminarProducto = async () => {
        try {
            const respuesta = await peticionEliminarProducto(
                motos ? "Motos" : "Repuestos",
                motos
                    ? { Nombre: producto["Nombre"], Modelo: producto["Modelo"] }
                    : { "Código de parte": producto["Código de parte"] }
            );

            if (!respuesta.ok) {
                popAlert("Hubo un error al eliminar el producto.", "error");
            }

            popAlert("Se eliminó correctamente el producto.", "success");
            const contenido = await respuesta.json();
            if (contenido === "Eliminado") {
                obtenerProductos(pagina,tamañoPagina);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Dialog open={abierto} onClose={() => setAbierto(false)}>
                <DialogTitle>
                    ¿Estás seguro que deseas eliminar {tipo_producto}{" "}
                    {producto["Nombre"]} del sistema?
                </DialogTitle>
                <DialogContent>
                    <Alert severity="warning">
                        <AlertTitle>
                            <strong>Alerta</strong>
                        </AlertTitle>
                        Al eliminar este producto, sus datos también se
                        eliminarán de forma permanente.
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAbierto(false)}>Cancelar</Button>
                    <Button
                        className="eliminar-boton"
                        onClick={() => {
                            eliminarProducto();
                            setAbierto(false);
                        }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalEliminar;
