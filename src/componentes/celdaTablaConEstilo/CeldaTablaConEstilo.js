import { styled, TableCell } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

/**
 * Componente estilizado para una celda de la tabla.
 *
 * @component
 * @example
 * return <CeldaTablaConEstilo>Contenido de la celda</CeldaTablaConEstilo>;
 */
const CeldaTablaConEstilo = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        maxWidth: "196px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
}));

export default CeldaTablaConEstilo;
