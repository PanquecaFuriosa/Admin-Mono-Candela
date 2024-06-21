import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import { FaUpload } from "react-icons/fa";
import { useGlobalAlert } from "../../hooks/useGlobalAlert";

import "./ComponenteArrastre.css";
import { peticionAgregacionMasivaProducto} from "../../Utilidades/FetchApis/PeticionesBD";

/**
 * Componente de arrastre de archivos.
 *
 * @param {boolean} abierto - Indica si el componente está abierto.
 * @param {function} setAbierto - Función para controlar el estado de abierto/cerrado del componente.
 * @param {string} tipoProducto - Tipo de producto asociado al archivo.
 * @param {function} obtenerProductos - Función para obtener los productos.
 * @returns {JSX.Element} Componente JSX de arrastre de archivos.
 */
function ComponenteArrastre({
  abierto,
  setAbierto,
  tipoProducto,
  obtenerProductos,
  pagina,
  tamañoPagina,
}) {
  const { popAlert } = useGlobalAlert();

  const { getRootProps } = useDropzone({
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    onDrop: async (archivosAceptados) => {
      const archivo = archivosAceptados[0];

      if (!archivo) {
        popAlert("Este formato del archivo no está soportado.", "error");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("tipo", tipoProducto);
        formData.append("archivo", archivo);

        const respuesta = await peticionAgregacionMasivaProducto(formData);

        const contenido = await respuesta.json();
        if (contenido === "Codigo duplicado") {
          popAlert(
            "Existe un producto con código duplicado. Por favor, revise el archivo.",
            "error"
          );
          return;
        } 
        
        if (contenido === "Error de validacion") {
          popAlert(
            "Hay campos inválidos o vacíos. Por favor, revise el archivo.",
            "error"
          );
          return;
        }
        
        if (!respuesta.ok) {
          popAlert("Hubo un error al cargar los datos.", "error");
          return;
        }
        
        popAlert("Se cargaron todos los datos satisfactoriamente.", "success");
        obtenerProductos(pagina, tamañoPagina);
        setAbierto(false);


      } catch (e) {
        console.log(e);
        popAlert("Hubo un error al cargar los datos.", "error");
        return;
      }
    },
    maxFiles: 1,
  });

  return (
    <div className="upload-file">
      <div {...getRootProps()} className="drag-file-area">
        <FaUpload className="icono-subir-archivo" />
        <p>
          Arrastra y sube un archivo XLS, o haz click aquí para seleccionar el
          archivo.
        </p>
      </div>
      <Button
        {...getRootProps()}
        variant="contained"
        component="label"
        className="subir-boton"
      >
        Subir archivo
      </Button>
    </div>
  );
}

export default ComponenteArrastre;
