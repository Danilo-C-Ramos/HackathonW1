// server.js
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Configuração do PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors());
app.use(express.json());

// Rotas CRUD básicas
// GET ALL
app.get('/api/itens', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM itens');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// GET BY ID
app.get('/api/itens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM itens WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).send('Item não encontrado');
    }
    
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// POST
app.post('/api/itens', async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO itens (nome, descricao) VALUES ($1, $2) RETURNING *',
      [nome, descricao]
    );
    
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// PUT
app.put('/api/itens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    
    const { rowCount } = await pool.query(
      'UPDATE itens SET nome = $1, descricao = $2 WHERE id = $3',
      [nome, descricao, id]
    );
    
    if (rowCount === 0) {
      return res.status(404).send('Item não encontrado');
    }
    
    res.status(200).send('Item atualizado com sucesso');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// DELETE
app.delete('/api/itens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      'DELETE FROM itens WHERE id = $1',
      [id]
    );
    
    if (rowCount === 0) {
      return res.status(404).send('Item não encontrado');
    }
    
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota de status
app.get('/status', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).send('Rota não encontrada');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});