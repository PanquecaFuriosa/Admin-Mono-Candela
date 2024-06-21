import { Alert, Fade } from "@mui/material";
import { useGlobalAlert } from "../hooks/useGlobalAlert";

/**
 * Componente para mostrar una alerta global.
 * Obtiene el estado de alerta del contexto global y muestra la alerta si está presente.
 * @returns {JSX.Element} El componente de alerta global.
 */
const GlobalAlert = () => {
  const { alert } = useGlobalAlert();

  return Object.keys(alert).length === 0 ? (
    <></>
  ) : (
    <Fade in={alert.fade}>
      <Alert
        severity={alert.severity}
        style={{ position: "fixed", zIndex: 2000 }}
      >
        {alert.text}
      </Alert>
    </Fade>
  );
};

export default GlobalAlert;
