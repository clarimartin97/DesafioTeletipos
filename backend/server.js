const express = require("express");
const cors = require("cors");
const app = express();
const PUERTO = 3001;

app.use(cors());
app.use(express.json());

let tareas = [];

app.get("/tareas", (req, res) => {
  res.json(tareas);
});

app.post("/tareas", (req, res) => {
  const { descripcion } = req.body;
  const nuevaTarea = { id: Date.now(), descripcion, completada: false };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

app.put("/tareas/:id", (req, res) => {
  const { id } = req.params;
  const tarea = tareas.find((t) => t.id == id);
  if (tarea) {
    tarea.completada = !tarea.completada;
    res.json(tarea);
  } else {
    res.status(404).json({ mensaje: "Tarea no encontrada" });
  }
});

app.delete("/tareas/:id", (req, res) => {
  tareas = tareas.filter((t) => t.id != req.params.id);
  res.status(204).send();
});

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
