import { useState } from "react";

// MUI
import {
    TextField,
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Box,
} from "@mui/material";

// alertas
import { useGlobalAlert } from "../../hooks/useGlobalAlert";

// funciones utiles
import { validacionCamposVacios } from "../../Utilidades/validacionCamposVacios";
import {
    peticionEditarProducto,
    peticionRegistrarProducto,
} from "../../Utilidades/FetchApis/PeticionesBD";
import {
    camposFijosMotos,
    camposFijosRepuestos,
} from "../../Utilidades/Constantes/CamposSinEdicion";
import TiposProductos from "../../Utilidades/Constantes/TiposProductos";

/**
 * Renderiza los pasos y campos del formulario en el modal.
 *
 * @param {string} tipoProducto - El tipo de producto de la vista actual.
 * @param {number} pasoActivo - El paso activo actual.
 * @param {object} campos - Los campos del formulario organizados por categoría.
 * @param {object} estadoForm - El estado actual del formulario.
 * @param {function} manejarCambiarDato - Función para manejar el cambio de datos en el formulario.
 * @param {function} siguientePaso - Función para avanzar al siguiente paso.
 * @param {function} pasoAnterior - Función para retroceder al paso anterior.
 * @param {function} reiniciarPasos - Función para reiniciar los pasos del formulario.
 * @param {function} finalizar - Función para finalizar el formulario.
 * @param {boolean} edicion - True si es modal de edicion, falso si es de creacion.
 * @returns {JSX.Element} Componente JSX que muestra los pasos y campos del formulario.
 */
const pasos = (
    tipoProducto,
    pasoActivo,
    campos,
    estadoForm,
    manejarCambiarDato,
    siguientePaso,
    pasoAnterior,
    reiniciarPasos,
    finalizar,
    edicion
) => {
    const pasosEtiquetas = [];
    const camposModal = [];

    for (let categoria in campos) {
        if (categoria !== "undefined") {
            const propsPasos = {};
            const propsEtiq = {};

            pasosEtiquetas.push(
                <Step key={categoria} {...propsPasos}>
                    <StepLabel {...propsEtiq}>{categoria}</StepLabel>
                </Step>
            );

            camposModal.push([]);
            for (let campo in campos[categoria]) {
                let deshabilitar = false;
                if (edicion) {
                    switch (tipoProducto) {
                        case TiposProductos.MOTOS:
                            deshabilitar = camposFijosMotos.some(
                                (c) => campo === c
                            );
                            break;
                        case TiposProductos.REPUESTOS:
                            deshabilitar = camposFijosRepuestos.some(
                                (c) => campo === c
                            );
                            break;
                        default:
                            break;
                    }
                }
                let esNumerico = false;

                if (["Precio", "Cantidad"].includes(campo)) esNumerico = true;

                if (campo !== "Suspendido") {
                    camposModal[camposModal.length - 1].push(
                        <Grid item xs={12} md={6} key={campo}>
                            <TextField
                                disabled={deshabilitar}
                                value={estadoForm[categoria][campo]}
                                onChange={(event) => {
                                    manejarCambiarDato(
                                        categoria,
                                        campo,
                                        event.target.value,
                                        esNumerico
                                    );
                                }}
                                label={campo}
                                fullWidth
                                style={{ marginTop: "0.5rem" }}
                            />
                        </Grid>
                    );
                }
            }
        }
    }
    return (
        <>
            <Stepper activeStep={pasoActivo}>{pasosEtiquetas}</Stepper>
            {pasoActivo === pasosEtiquetas.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Todos los datos han sido llenados. Seleccione Aplicar
                        para terminar la carga.
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button color="error" onClick={reiniciarPasos}>
                            Reiniciar
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Paso {pasoActivo + 1}
                    </Typography>
                    <Grid container rowSpacing={3} columnSpacing={3}>
                        {camposModal[pasoActivo]}
                    </Grid>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={pasoActivo === 0}
                            onClick={pasoAnterior}
                            sx={{ mr: 1 }}
                        >
                            Atrás
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                            onClick={() => {
                                siguientePaso();
                                pasoActivo === pasosEtiquetas.length - 1 &&
                                    finalizar();
                            }}
                        >
                            {pasoActivo === pasosEtiquetas.length - 1
                                ? "Terminar"
                                : "Siguiente"}
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
};

/**
 * Obtiene los nombres de las categorías de los campos.
 *
 * @param {object} campos - Los campos del formulario organizados por categoría.
 * @returns {string[]} Array con los nombres de las categorías.
 */
const nombresPasos = (campos) => {
    const nombres = [];

    for (let categoria in campos) {
        nombres.push(categoria);
    }

    return nombres;
};

/**
 * Componente de modal para agregar o modificar productos.
 *
 * @param {boolean} abierto - Indica si el modal está abierto.
 * @param {function} setAbierto - Función para controlar el estado de abierto/cerrado del modal.
 * @param {boolean} crear - Indica si se está creando un nuevo producto.
 * @param {object} campos - Los campos del formulario organizados por categoría.
 * @param {string} tipoProducto - El tipo de producto.
 * @param {function} obtenerProductos - Función para obtener los productos.
 * @returns {JSX.Element} Componente JSX del modal.
 */
const PlantillaModal = ({
    abierto,
    setAbierto,
    crear,
    campos,
    tipoProducto,
    obtenerProductos,
    pagina,
    tamañoPagina,
}) => {
    const [estadoForm, setEstadoForm] = useState(campos);
    const [pasoActivo, setPasoActivo] = useState(0);
    const [final, setFinal] = useState(false);
    const categorias = nombresPasos(campos);
    const { popAlert } = useGlobalAlert();

    const manejarCambiarDato = (
        categoria,
        campo,
        valor,
        esNumerico = false
    ) => {
        if (!esNumerico || (esNumerico && /^[0-9]*$/.test(valor))) {
            setEstadoForm({
                ...estadoForm,
                [categoria]: {
                    ...estadoForm[categoria],
                    [campo]: valor,
                },
            });
        }
    };

    const siguientePaso = () => {
        if (validacionCamposVacios(estadoForm[categorias[pasoActivo]])) {
            popAlert("Hay campos vacios", "error");
            return;
        }
        setPasoActivo((antPasoActivo) => antPasoActivo + 1);
    };

    const pasoAnterior = () => {
        setPasoActivo((antPasoActivo) => antPasoActivo - 1);
    };

    const reiniciarPasos = () => {
        setPasoActivo(0);
        setFinal(false);
    };
    const finalizar = async () => {
        if (validacionCamposVacios(estadoForm[categorias[pasoActivo]])) {
            popAlert("Hay campos vacios", "error");
            return;
        }
        setFinal(true);
    };

    const manejarEnvioModal = async () => {
        try {
            const respuesta = crear
                ? await peticionRegistrarProducto(
                      JSON.stringify({ tipo: tipoProducto, form: estadoForm })
                  )
                : await peticionEditarProducto(tipoProducto, estadoForm);

            const contenido = await respuesta.json();
            if (contenido === "Codigo duplicado") {
                popAlert(
                    "Existe un producto con código duplicado. Por favor, revise el archivo.",
                    "error"
                );
                return;
            }

            if (!respuesta.ok) {
                popAlert("Hubo un error al cargar los datos.", "error");
                return;
            }

            popAlert(
                `Producto ${crear ? "agregado" : "modificado"} adecuadamente`,
                "success"
            );
            obtenerProductos(pagina, tamañoPagina);
            setAbierto(false);
        } catch (e) {
            console.log(e);
            popAlert("Ocurrió un error de red.", "error");
            return;
        }
    };

    return (
        <>
            <Dialog
                open={abierto}
                onClose={() => setAbierto(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    {crear
                        ? `Agregar producto de ${tipoProducto}`
                        : `Modificar producto de ${tipoProducto}`}
                </DialogTitle>

                <DialogContent>
                    {pasos(
                        tipoProducto,
                        pasoActivo,
                        campos,
                        estadoForm,
                        manejarCambiarDato,
                        siguientePaso,
                        pasoAnterior,
                        reiniciarPasos,
                        finalizar,
                        !crear
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAbierto(false)}>Cancelar</Button>
                    {final && (
                        <Button onClick={manejarEnvioModal} autoFocus>
                            Aplicar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export { PlantillaModal };
