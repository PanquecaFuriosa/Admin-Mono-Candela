import { createContext, useRef, useState } from "react";

/**
 * Contexto global de alertas.
 * Permite mostrar y ocultar alertas en la aplicación.
 * Tiene la forma msj: "", severidad: "", tipo: ""
 */
export const AlertContext = createContext({});

/**
 * Proveedor de contexto de alertas.
 * Proporciona el estado y las funciones para mostrar y ocultar alertas.
 * @param {object} children Los componentes hijos envueltos por el proveedor de alertas.
 * @returns {JSX.Element} El proveedor de contexto de alertas.
 */
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({});
  let timeOutID = useRef(undefined);

  /**
   * Muestra una alerta con el texto y severidad especificados.
   * @param {string} text El texto de la alerta.
   * @param {string} severity La severidad de la alerta (por ejemplo, "error", "warning", "info", "success").
   */
  const popAlert = (text, severity) => {
    if (timeOutID.current !== undefined) clearTimeout(timeOutID.current);

    setAlert({ text: text, severity: severity, fade: true });

    timeOutID.current = setTimeout(() => {
      setAlert({});
    }, 4000);
  };

  return (
    <AlertContext.Provider value={{ alert, popAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
