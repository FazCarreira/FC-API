const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send("API FUNCIONANDO"));

// Define Routes
app.use('/auth', require('./routes/auth-route'));
app.use('/site', require('./routes/site-route'));
app.use('/user', require('./routes/user-route'));
app.use('/profile', require('./routes/profile-route'));
app.use('/trilha', require('./routes/trilha-route'));
app.use('/treinamento', require('./routes/treinamento-route'));
app.use('/turma', require('./routes/turma-route'));
app.use('/file', require('./routes/files-route'));
app.use('/post', require('./routes/post-route'));
app.use('/aluno', require('./routes/aluno-route'));
app.use('/facilitador', require('./routes/facilitador-route'));

// app.use('/', require('./routes/migration-route'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server iniciado na porta: ${PORT}`));