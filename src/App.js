import React from "react";
import { Routes, Route } from "react-router-dom";
import IniciarSesion from "./paginas/iniciarSesion/IniciarSesion";
import NoEncontrado from "./paginas/comunes/NoEncontrado";
import BarraLateral from "./componentes/barraLateral/BarraLateral";
import Motos from "./paginas/motos/Motos";
import Repuestos from "./paginas/repuestos/Repuestos";
import GlobalAlert from "./componentes/GlobalAlert";
import RequiereAutorizacion from "./componentes/autorizacion/RequiereAutorizacion";

function App() {
  return (
    <>
      <GlobalAlert />
      <Routes>
        {/*Paginas Publicas*/}
        <Route path="/" element={<IniciarSesion />} />

        {/*Paginas privadas*/}
        <Route element={<RequiereAutorizacion />}>
          <Route
            path="/motos"
            element={
              <BarraLateral>
                <Motos />
              </BarraLateral>
            }
          />

          <Route
            path="/repuestos"
            element={
              <BarraLateral>
                <Repuestos />
              </BarraLateral>
            }
          />
        </Route>

        {/*Otras*/}
        <Route
          path="*"
          element={
            <BarraLateral>
              <NoEncontrado />
            </BarraLateral>
          }
        />
      </Routes>
    </>
  );
}

export default App;
