import HyperExpress from 'hyper-express';
import { BadgeRouter } from './Routers/Badging/badging.js';
import { DocsRouter } from './Routers/Docs/docs.js';

const webserver = new HyperExpress.Server();

/* Tech / Precision / Chocaltey-ness / Puzzle->Execution */
webserver.use((req, res, next) => {
    res.setHeaders({
        "access-control-allow-origin": "*"
    });
    next();
});
webserver.options("/*", (req, res) => {
    res.setHeaders({
        "access-control-allow-methods": "HEAD, OPTIONS, GET, POST, PUT, PATCH, DELETE",
        "access-control-allow-headers": req.headers['access-control-request-headers'] || "*"
    });
    res.status(204).send('');
});

webserver.use('/badge', BadgeRouter);
webserver.use('/', DocsRouter);

webserver.listen(8080)
    .then((socket) => { console.log(`Webserver listening on port 8080`); })
    .catch((error) => { console.log(`Failure in webserver initiation: ${error}`); });