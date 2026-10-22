
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Permitir recibir datos en formato JSON
app.use(express.json());

// Servir los archivos de la página web
app.use(express.static(__dirname));

// Guardar los resultados mientras el servidor esté encendido
const resultados = [];

// Recibir resultados del cuestionario
app.post("/api/resultados", (req, res) => {
  resultados.push({
    ...req.body,
    fecha: new Date().toISOString()
  });

  res.json({
    ok: true,
    mensaje: "Resultado recibido correctamente"
  });
});

// Consultar resultados desde el panel de administración
app.get("/api/resultados", (req, res) => {
  res.json(resultados);
});

// Borrar resultados desde el panel de administración
app.delete("/api/resultados", (req, res) => {
  resultados.length = 0;

  res.json({
    ok: true,
    mensaje: "Resultados borrados correctamente"
  });
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});