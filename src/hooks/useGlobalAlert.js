import { useContext } from "react";
import { AlertContext } from "../contextos/AlertProvider";

/**
 * Hook personalizado que proporciona acceso al contexto global de alertas.
 * @returns {object} Objeto de contexto global de alertas.
 */
export const useGlobalAlert = () => {
  return useContext(AlertContext);
};
