const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
let logger = require('morgan');

app.use(logger('dev'));

function selectProxyHost(req) {
    if (req.path.startsWith('/Cadastro'))
        return 'http://localhost:8080/';
    else if (req.path.startsWith('/Cobranca'))
        return 'http://localhost:8094/';
    else if (req.path.startsWith('/EstadoVagas'))
        return 'http://localhost:8096/';
    else if (req.path.startsWith('/Vaga'))
        return 'http://localhost:8081/';
    else if (req.path.startsWith('/ControleVagas'))
        return 'http://localhost:8082/';
    else if (req.path.startsWith('/ControleCreditos'))
        return 'http://localhost:8092/';          
    else return null;
}

app.use((req, res, next) => {
    const proxyHost = selectProxyHost(req);
    if (proxyHost) {
        httpProxy(proxyHost)(req, res, next);
    } else {
        res.status(404).send('Not Found');
    }
});

app.listen(8000, () => console.log('API Gateway iniciado!'));