import {  useEffect, useState } from 'react';
import { createTask, updateTask  } from '../services/servicio-tareas';

//Formulario para agregar una nueva tarea
function NuevaTarea({ onTaskCreated, taskToEdit, onClearEdit }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
      }
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskToEdit) {
      await updateTask(taskToEdit.id, { title, description });
      onClearEdit();
    } else {
      await createTask({ 
        title,
        description,
        completed: false,
        createdAt: new Date().toISOString() });
    }

    setTitle('');
    setDescription('');
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3" >
        <label htmlFor="titulo" className="form-label">
          Título de la tarea
        </label>
        <input
          type="titulo"
          className="form-control"
          id="titulo"
          value={title}
          placeholder="Título"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label for="descripcion" className="form-label">
          Descripción de la tarea
        </label>
        <textarea
          className="form-control"
          id="descripcion"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary w-100" 
      type="submit" 
      style={{backgroundColor: 'turquoise', borderColor: 'darkturquoise', color: 'black'}}>
        {taskToEdit ? 'Guardar cambios' : 'Agregar'}
      </button>
    </form>
  );
}

export default NuevaTarea



