import { useState, useEffect } from "react";
import NuevaTarea from "./components/nueva-tarea";
import ListadoTareas from "./components/listado-tareas";
import { getTasks } from "./services/servicio-tareas";
//import React from "react";
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className='contenedor-app'>
      <h1 className="col-12 pt-5">Aplicación de tareas</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h4>Agregar Tarea</h4>
            <NuevaTarea
              onTaskCreated={loadTasks}
              taskToEdit={taskToEdit}
              onClearEdit={() => setTaskToEdit(null)}
            ></NuevaTarea>
          </div>
          <div className="col-md-6">
            <h4>Lista de Tareas</h4>
            <p className="text-center">Para ver la descripción, hacer click en la tarea</p>
            <ListadoTareas
              tasks={tasks}
              onTaskUpdated={loadTasks}
              onEdit={setTaskToEdit}
            ></ListadoTareas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
