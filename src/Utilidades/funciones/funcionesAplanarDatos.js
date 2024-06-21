/**
 * Obtiene las clases de clasificación para cada campo en un objeto de campos.
 * @param {object} campos - Objeto de campos que contiene los campos a clasificar.
 * @returns {object} - Objeto que asigna a cada campo su correspondiente clase de clasificación.
 */
export const obtenerClases = (campos) => {
  const clases = {};

  for (let clasificacion in campos) {
    for (let campo in campos[clasificacion]) {
      clases[campo] = clasificacion;
    }
  }

  return clases;
};

/**
 * Clasifica los campos en un objeto de campos según sus clases de clasificación.
 * @param {object} clases - Objeto que asigna a cada campo su correspondiente clase de clasificación.
 * @param {object} campos - Objeto de campos que contiene los campos a clasificar.
 * @returns {object} - Objeto que agrupa los campos clasificados por sus clases de clasificación.
 */
export const clasificar = (clases, campos) => {
  const camposClasificados = {};

  for (let campo in campos) {
    if (camposClasificados[clases[campo]] === undefined) {
      camposClasificados[clases[campo]] = {};
    }
    camposClasificados[clases[campo]][campo] = campos[campo];
  }
  return camposClasificados;
};
