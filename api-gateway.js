const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');

app.use(logger('dev'));

function selectProxyHost(req) {
    if (req.path.startsWith('/Cadastro'))
        return 'http://localhost:8080/';
    else if (req.path.startsWith('/Conta'))
        return 'http://localhost:8090/';
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