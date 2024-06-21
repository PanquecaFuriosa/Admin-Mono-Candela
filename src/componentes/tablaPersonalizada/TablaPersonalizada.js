import React from "react";
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from "@mui/material";
import CeldaTablaConEstilo from "../celdaTablaConEstilo/CeldaTablaConEstilo";
import FilasTablaConEstilo from "../filasTablaConEstilo/FilasTablaConEstilo";

/**
 * Componente de tabla personalizada.
 *
 * @param {object} props - Propiedades del componente.
 * @param {array} props.filas - Filas de datos.
 * @param {array} props.columnas - Columnas de la tabla.
 * @returns {JSX.Element} Componente JSX de tabla personalizada.
 */
const TablaPersonalizada = (props) => {

    /**
     * Maneja el cambio de filas por página.
     *
     * @param {object} event - Evento del cambio de filas por página.
     */
    const cambioFilasPorPagina = (event) => {
        props.setTamañoPagina(parseInt(event.target.value, 10));
        props.obtenerProductos(props.pagina, parseInt(event.target.value, 10));
    };

    const cambioDePagina = (event, nuevaPagina) => {
        props.setPagina(nuevaPagina);
        props.obtenerProductos(nuevaPagina, props.tamañoPagina);
    };

    const keyframes = `
    @-webkit-keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
    }
  `;
    return (
        <>
            <style>{keyframes}</style>
            <div
                style={{
                    WebkitAnimation:
                        "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                    animation:
                        "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                }}
            >
                <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {props.columnas.map((columna, indice) => (
                                    <CeldaTablaConEstilo
                                        align={
                                            columna === "Acciones"
                                                ? "center"
                                                : "left"
                                        }
                                        key={columna}
                                    >
                                        {columna}
                                    </CeldaTablaConEstilo>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.filas?.map((fila) => (
                                    <FilasTablaConEstilo>
                                        {Object.values(fila).map(
                                            (valor, indice) => (
                                                <CeldaTablaConEstilo
                                                    key={indice}
                                                    align={
                                                        indice === 5
                                                            ? "center"
                                                            : "left"
                                                    }
                                                >
                                                    {valor}
                                                </CeldaTablaConEstilo>
                                            )
                                        )}
                                    </FilasTablaConEstilo>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={-1}
                    page={props.pagina}
                    rowsPerPage={props.tamañoPagina}
                    rowsPerPageOptions={[5, 10, 25]}
                    onPageChange={cambioDePagina}
                    onRowsPerPageChange={cambioFilasPorPagina}
                    labelRowsPerPage={"Filas por página"}
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to}`
                    }
                    nextIconButtonProps={{
                        disabled: props.filas.length < props.tamañoPagina,
                    }}
                />
            </div>
        </>
    );
};

export default TablaPersonalizada;
