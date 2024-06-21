/**
 * Toma un JSON de dos niveles y lo aplana en un solo nivel.
 * @param {Object} ob - El objeto JSON a aplanar.
 * @returns {Object} - El objeto JSON aplanado.
 */
const aplanar = (ob) => {
  let resultado = {};

  for (const i in ob) {
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = aplanar(ob[i]);
      for (const j in temp) {
        resultado[j] = temp[j];
      }
    } else {
      resultado[i] = ob[i];
    }
  }
  return resultado;
};

module.exports = { aplanar: aplanar };