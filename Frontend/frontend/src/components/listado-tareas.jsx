import { deleteTask, updateTask } from '../services/servicio-tareas';
import { useState } from 'react';

function ListadoTareas({ tasks, onTaskUpdated, onEdit }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleCompleted = async (task) => {
    await updateTask(task.id, { completed: !task.completed });
    onTaskUpdated();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    onTaskUpdated();
  };

  return (
    <ul className="list-group">
      {tasks.map(task => (
        <li key={task.id} className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                /*className="form-check-input me-2"*/ 
                checked={task.completed}
                onChange={() => toggleCompleted(task)}
                style={{ accentColor: 'turquoise', width: '1.2em', height: '1.2em', marginRight: '0.5em' }}
              />
              <span
                style={{ cursor: 'pointer', textDecoration: task.completed ? 'line-through' : 'none' }}
                onClick={() => toggleExpand(task.id)}
              >
                {task.title}
              </span>
            </div>
            <div>
              <button className="btn btn-sm btn-light me-2" style={{ borderColor: 'lightseagreen' , color: 'lightseagreen'}} onClick={() => onEdit(task)}>Editar</button>
              <button className="btn btn-sm btn-light" style={{ borderColor: 'sandybrown' , color: 'sandybrown'}} onClick={() => handleDelete(task.id)}>Eliminar</button>
            </div>
          </div>
          {expandedId === task.id && (
            <div className="mt-2">
              <small>{task.description}</small><br />
              <small className="text-muted">Creada: {new Date(task.createdAt).toLocaleString()}</small>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ListadoTareas;