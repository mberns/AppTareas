//funciones que hacen fetch al backend

const API_URL = 'http://localhost:3000/api/tasks'; //link del backend

//leemos las tareas
export async function getTasks() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createTask(task) {
  console.log('Tarea enviada al backend:', task);
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return res.json();
}