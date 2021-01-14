import https from 'https';
import httpProxy from 'http-proxy';
import os from 'os';
import path from 'path';
import fs from 'fs';
import isValidDomain from 'is-valid-domain';

const HOSTS = new Map();
const DIR = path.join(os.homedir(), '.localh.app');

const setConfigHost = (host, options) => {
    HOSTS.set(host, options);
}
const setHosts = (hosts) => {
    console.log("set hosts");
    const failed = [];
    for (let [host, options] of Object.entries(hosts)) {
        host = host.toLowerCase();
        if (isValidDomain(host) && host != 'config.localh.app') {
            HOSTS.set(host, options);
        } else {
            failed.push(host);
        }
    }
    return {failed}
}
const removeHosts = (hosts) => { // Array with string domain
    console.log("--- REMOVE ", hosts);
    for (const host of hosts) {
        const out = HOSTS.delete(host);
        console.log(host, out);
    }
    console.log(hosts);
}
const getHosts = () => {
    return Object.fromEntries(HOSTS);
}

const startLocalhappServer = () => {
    // console.log(showCertInfo());
    const proxy = new httpProxy.createProxyServer();
    proxy.on('error', (e) => {
        console.log(e);
    })
    // TODO:
    const httpsServer = https.createServer({
        key: fs.readFileSync(path.join(DIR, 'privkey.pem')),
        cert: fs.readFileSync(path.join(DIR, 'cert.pem'))
    }, (req, res) => {
        const HOST = HOSTS.get(req.headers.host);
        if (HOST) {
            proxy.web(req, res, {
                target: HOST.target
            });
        } else {
            res.writeHead(404, {'content-type': 'text/text'});
            res.end("");
        }
    }).listen(443);
    httpsServer.on('upgrade', function (req, socket, head) {
        const HOST = HOSTS.get(req.headers.host);
        if (HOST) {
            proxy.ws(req, socket, head, {
                target: HOST.target
            });
        } else {
            socket.end('HTTP/1.1 404 Bad Request');
        }

    });
}

export {
    startLocalhappServer,
    setConfigHost,
    setHosts,
    removeHosts,
    getHosts
}