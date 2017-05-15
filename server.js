const express = require('express');
var proxy = (require('http-proxy')).createProxyServer();
const app = express();

app.set('port', (process.env.PORT || 3001));
// process the api calls through ng-apimock
// serve the mocking interface for local development
app.use('/', express.static('.'));

app.all("/api/*", function (req, res, next) {
    proxy.web(req, res, {
        target: "http://ngapimock:3000",
        secure: false,
        logLevel: "debug",
        changeOrigin: true
    }, function (e) {
        console.log(e)
        next();
    });
});

app.listen(app.get('port'), function () {
    console.log('app running on port', app.get('port'));
});