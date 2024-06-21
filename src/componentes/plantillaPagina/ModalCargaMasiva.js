import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ComponenteArrastre from "./ComponenteArrastre";

/**
 * Componente de modal para la carga masiva de datos desde un archivo de Excel.
 * @param {boolean} abierto - Indica si el modal está abierto o cerrado.
 * @param {Function} setAbierto - Función para establecer el estado de abierto/cerrado del modal.
 * @param {string} tipoProducto - Tipo de producto para la carga masiva.
 * @param {Function} obtenerProductos - Función para obtener los productos después de la carga masiva.
 * @returns {JSX.Element} El componente del modal de carga masiva.
 */
const ModalCargaMasiva = ({
  abierto,
  setAbierto,
  tipoProducto,
  obtenerProductos,
  pagina,
  tamañoPagina,
}) => {
  return (
    <Dialog open={abierto} onClose={() => setAbierto(false)}>
      <DialogTitle>Sube un archivo de Excel</DialogTitle>
      <DialogContent>
        <ComponenteArrastre
          abierto={abierto}
          setAbierto={setAbierto}
          tipoProducto={tipoProducto}
          obtenerProductos={obtenerProductos}
          pagina = {pagina}
          tamañoPagina = {tamañoPagina}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAbierto(false)}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCargaMasiva;
