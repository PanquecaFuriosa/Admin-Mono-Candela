import { styled, Paper } from "@mui/material";

/**
 * Componente estilizado para un elemento en un contenedor.
 *
 * @component
 * @example
 * return <Item>Contenido del elemento</Item>;
 */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default Item;
