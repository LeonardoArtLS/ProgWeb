const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

app.get('/sobre', (req, res) => {
    res.send('Esta é a pagina sobre');
});

app.use('/', require('./routes'))

app.listen(3000, () => {
    console.log('Servidor  rodando em http://localhost:3000');
});