import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "http://localhost:3001/tareas";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTareas(data));
  }, []);

  const agregarTarea = () => {
    if (!nuevaTarea) return;
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: nuevaTarea }),
    })
      .then((res) => res.json())
      .then((tarea) => setTareas([...tareas, tarea]));
    setNuevaTarea("");
  };

  const toggleTarea = (id) => {
    fetch(`${API_URL}/${id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((tareaActualizada) => {
        setTareas(
          tareas.map((tarea) =>
            tarea.id === tareaActualizada.id ? tareaActualizada : tarea
          )
        );
      });
  };

  const eliminarTarea = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() =>
      setTareas(tareas.filter((tarea) => tarea.id !== id))
    );
  };

  const handleCheckboxChange = (id) => {
    toggleTarea(id);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Lista de Tareas
        </Typography>
        <div style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}>
          <TextField
            label="Nueva tarea"
            variant="outlined"
            fullWidth
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={agregarTarea}
            style={{ marginBottom: "20px", marginLeft: "10px" }}
          >
            Agregar Tarea
          </Button>
          <ul>
            {tareas.map((tarea) => (
              <li
                key={tarea.id}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Checkbox
                  checked={tarea.completada}
                  onChange={() => handleCheckboxChange(tarea.id)}
                />
                <Typography
                  variant="body1"
                  style={{
                    textDecoration: tarea.completada ? "line-through" : "none",
                    marginRight: "10px",
                    flex: 1,
                  }}
                >
                  {tarea.descripcion}
                </Typography>
                <IconButton
                  onClick={() => eliminarTarea(tarea.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
