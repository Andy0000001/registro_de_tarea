import React, { useReducer } from "react";
import ProyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  PROYECTO_ERROR,
  VALIDAR_FORMULLARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from "../types";

import clienteAxios from "../config/axios";

const ProyectoState = (props) => {
  const inicialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null,
  };
  //Dispach para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, inicialState);

  //series de funciones  para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };
  // Obtener los proyectos
  const ObtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");

      dispatch({
        type: OBTENER_PROYECTO,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        msg: 'hubo un erro',
        categoria: 'error'
      }
      
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  };
  // Agregar Proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      
      // insertar el proyecto en le state
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "hubo un erro",
        categoria: "error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };
  // valida el formulario por errores
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULLARIO,
    });
  };

  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };
  // Eliminar ProyectoId
  const eliminarProyecto = async (proyectoId) => {
    
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      })
    
    } catch (error) {
      const alerta = {
        msg: "hubo un erro",
        categoria: "error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <ProyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        ObtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  );
};
export default ProyectoState;
