/**
 * Verifica si hay campos vacíos en un objeto de estado.
 * @param {object} estadoCampos - Objeto de estado que contiene los campos a validar.
 * @returns {boolean} - Indica si hay al menos un campo vacío (true) o no (false).
 */
export const validacionCamposVacios = (estadoCampos) => {
  let hayCampoVacio = false;

  for (let campo in estadoCampos) {
    if (estadoCampos[campo] === "") {
      hayCampoVacio = true;
      break;
    }
  }

  return hayCampoVacio;
};
