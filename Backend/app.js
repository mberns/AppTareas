console.log("hola mundo!"); //prueba

//Servidor express
const express = require ('express');
const cors = require('cors');
const app = express();

//activamos el cors globalmente (para q el back acepte peticiones del front)
app.use(cors({
  origin: 'http://localhost:5173'  // Solo permite este origen (por seguridad)
}));

//Leer el json del body
app.use(express.json());

//Almacenamiento temporal de las tareas
let tasks = [];

//Contador global para generar los ids 
let currentId = 1;

const PUERTO = 3000;

app.listen (PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`)
})

/////////Routing///////////

//Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    //console.log("hola hola");
    res.json(tasks);
    //res.end("ABCDEFGHI");
}) 

//Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    //prueba
    //res.end("respuesta post");

    const task = req.body; //lee el dato del body

    if (!task.title) {
        return res.status(400).json({ error: 'Falta el título' });
    }

    task.id = (currentId++).toString(); //le damos un id, que es el id previo +1
    task.completed = false;
    tasks.push (task); //se guarda la tarea en el almacenamiento temporal
    res.status(201).json(task); // confirmamos que se creó

}) 

//Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
    //prueba
    //res.end("respuesta put");
    
    //const id = Number(req.params.id);
    const id = req.params.id; //ya es un string
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    //fusiona la tarea anterior con los nuevos datos enviados
    tasks[index] = { ...tasks[index], ...req.body };

    res.json(tasks[index]);
})

//Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
    //prueba
    //res.end("delete");

    //const id = Number(req.params.id);//lo pasa a nro porque por defecto es string
    const id = req.params.id;
    const initialLength = tasks.length;

    //crea un nuevo arreglo sin la tarea con el id que se le paso
    tasks = tasks.filter(task => task.id !== id);

    //verificamos si se elimino
    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    //exito pero sin datos
    res.status(204).end(); //end() corta la respuesta, no se manda json
})