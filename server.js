import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Caminho absoluto para a pasta "dist"
const distPath = path.join(__dirname, 'dist');

// Servir arquivos estáticos
app.use(express.static(distPath));

// Fallback manual para SPA (Vue Router)
app.get('/*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
