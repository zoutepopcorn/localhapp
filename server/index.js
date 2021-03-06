import Fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import cors from "fastify-cors";
import path from 'path';
import internalIp from "internal-ip";

import {getCertJson, refreshCertInfo} from '@localhapp/cert-info/index.js';
import {downloadCerts} from '@localhapp/downnload/index.js';
import {startDns} from './dns.js';
import {getHosts, removeHosts, setHosts, startLocalhappServer, setConfigHost} from "./server.js";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GUI = path.join(__dirname, 'dist_gui');
const configServer = Fastify();
configServer.register(cors);

const setGuiServer = (guiPath = GUI) => {
    // TODO: if guiPath not found...
    configServer.register(fastifyStatic, {
        root: guiPath
    });
    setConfigHost("config.localh.app", {target: "http://localhost:8041"});
}
const setApiServer = () => {
    configServer.get('/api', async (request, reply) => {
        reply.send(getHosts());
    });
    configServer.post('/api', async (request, reply) => {
        const response = setHosts(request.body);
        reply.send({response, hosts: getHosts()});
    });
    configServer.delete('/api', async (request, reply) => {
        const response = removeHosts(request.body);
        reply.send({response, hosts: getHosts()});
    });
    configServer.get('/api/ip', async (request, reply) => {
        reply.send(await internalIp.v4());
    });
    configServer.get('/api/certificate', async (request, reply) => {
        reply.send(getCertJson());
    });
    // TODO: listen on localhost only or available on the network ?
}
const getLocalIp = async () => {
    return await internalIp.v4();
}

const startServer = async (PORT = 8041) => {
    const CERT_INFO = getCertJson();
    console.log(CERT_INFO.cliText);
    if(!CERT_INFO.hasCert || CERT_INFO.days < 90 - 14) {
        await downloadCerts();
        refreshCertInfo();
        console.log(getCertJson().cliText);
    }
    configServer.listen(PORT).then(async () => {
        // console.log("started configserver https://config.localh.app");
    });
    startLocalhappServer();
}

export {
    getLocalIp,
    setApiServer,
    setGuiServer,
    startServer,
    startDns
}