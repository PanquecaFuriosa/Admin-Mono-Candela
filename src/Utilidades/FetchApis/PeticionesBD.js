//////////////////////////////////////////////////////////////
// Peticiones para manejar los productos de la base de datos
//////////////////////////////////////////////////////////////

/**
 * Realiza una petición para almacenar un nuevo producto en la base de datos.
 * @param {string} body - Cadena JSON que contiene el tipo de producto y los datos del formulario.
 * @returns {Promise<Response>} - Promesa que resuelve en la respuesta de la petición.
 */
export const peticionRegistrarProducto = async (body) => {
  return fetch("http://localhost:5000/agregar-producto", {
    method: "POST",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
    },
    body: body,
  });
};

/**
 * Realiza una petición para obtener los productos de un tipo específico desde la base de datos.
 * @param {string} tipoProducto - Tipo de producto para filtrar los resultados.
 * @returns {Promise<Response>} - Promesa que resuelve en la respuesta de la petición.
 */
export const peticionObtenerProductos = async (tipoProducto, pagina = 0, tamañoPagina = 5) => {
  return fetch(`http://localhost:5000/obtener-productos?tipo=${tipoProducto}&pagina=${pagina}&tamahoPagina=${tamañoPagina}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
};

/**
 * Realiza una petición para eliminar un producto de la base de datos.
 * @param {string} tipoProducto - Tipo de producto al que pertenece el producto a eliminar.
 * @param {object} datos - Datos del producto a eliminar.
 * @returns {Promise<Response>} - Promesa que resuelve en la respuesta de la petición.
 */
export const peticionEliminarProducto = async (tipoProducto, datos) => {
  return fetch("http://localhost:5000/eliminar-producto", {
    method: "POST",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
    },
    body: JSON.stringify({ tipo: tipoProducto, datos: datos }),
  });
};

/**
 * Realiza una petición para cambiar la suspensión de un producto en la base de datos.
 * @param {string} tipoProducto - Tipo de producto al que pertenece el producto a suspender.
 * @param {object} datos - Datos del producto a suspender.
 * @returns {Promise<Response>} - Promesa que resuelve en la respuesta de la petición.
 */
export const peticionSuspensionProducto = async (tipoProducto, datos) => {
  return fetch("http://localhost:5000/suspension-producto", {
    method: "POST",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
    },
    body: JSON.stringify({ tipo: tipoProducto, datos: datos }),
  });
};

/**
 * Realiza una petición para la agregación masiva de productos en la base de datos.
 * @param {string} tipoProducto - Tipo de producto al que pertenecen los datos a agregar.
 * @param {object} datos - Datos de los productos a agregar.
 * @returns {Promise<Response>} - Promesa que resuelve en la respuesta de la petición.
 */
export const peticionAgregacionMasivaProducto =async (datos) => {
  return fetch("http://localhost:5000/agregacion-masiva-producto", {
    method: "POST",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5000",
    },
    body: datos,
  });
};

/**
 * Realiza una petición para editar todos los detalles de un producto
 * @param {string} tipoProducto - Tipo de producto al que pertenece el producto a suspender.
 * @param {object} datos - Datos del producto a suspender.
 * @returns {Promise<Response>} - Promesa que resuelve en la respuesta de la petición.
 */
export const peticionEditarProducto = async (tipoProducto, datos) => {
  return fetch("http://localhost:5000/editar-producto", {
    method: "POST",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
    },
    body: JSON.stringify({ tipo: tipoProducto, datos: datos }),
  });
};

//////////////////////////////////////////////////////////////
// Peticiones para manejo de la sesion
//////////////////////////////////////////////////////////////
/**
 * Realiza una petición para verificar la sesión del usuario.
 * @returns {Promise<Response>} - Promesa que resuelve en la respuesta de la petición.
 */
export const chequearSesion = async () => {
  return fetch("http://localhost:5000/comprobar-sesion", {
    method: "GET",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Realiza una petición para iniciar sesión.
 * @param {object} body - Cuerpo de la petición que contiene los datos de inicio de sesión.
 * @returns {Promise<Response>} - Promesa que resuelve en la respuesta de la petición.
 */
export const iniciarSesion = async (body) => {
  return fetch("http://localhost:5000/iniciar-sesion", {
    method: "POST",
    credentials: "include",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
    },
    body: JSON.stringify(body),
  });
};

/**
 * Realiza una petición para cerrar sesión.
 * @returns {Promise<Response>} - Promesa que resuelve en la respuesta de la petición.
 */
export const cerrarSesion = async () => {
  return fetch("http://localhost:5000/cerrar-sesion", {
    method: "GET",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
