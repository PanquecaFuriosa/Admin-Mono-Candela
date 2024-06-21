import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { chequearSesion } from "../../Utilidades/FetchApis/PeticionesBD";

/**
 * Componente que hace que una ruta solo esté disponible para usuarios administradores.
 * La forma en que funciona es que cada vez que un usuario intenta acceder a una
 * ruta protegida para administradores, realiza una verificación del estado de la sesión
 * del administrador y comprueba si está presente y es válida.
 */
const RequiereAutorizacion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inicioSesion, setInicioSesion] = useState(false);
  useEffect(() => {
    /**
     * Realiza una verificación de la sesión del usuario.
     * @returns {Promise<void>} Una promesa que resuelve cuando se completa la verificación de la sesión.
     */
    const chequeoDeSesion = async () => {
      try {
        const resp = await chequearSesion();
        if (!resp.ok) {
          navigate("/", {
            state: { from: location },
            replace: true,
          });
          return;
        }

        setInicioSesion(true);
      } catch (error) {}
    };

    chequeoDeSesion();
  });

  try {
    return inicioSesion ? <Outlet /> : <>Cargando...</>;
  } catch (e) {
    return (
      <Navigate to={"/no-autorizado"} state={{ from: location }} replace />
    );
  }
};

export default RequiereAutorizacion;
