import { styled, TableRow } from "@mui/material";

/**
 * Componente estilizado para una fila de la tabla.
 *
 * @component
 * @example
 * return <FilasTablaConEstilo>Contenido de la fila</FilasTablaConEstilo>;
 */
const FilasTablaConEstilo = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default FilasTablaConEstilo;
