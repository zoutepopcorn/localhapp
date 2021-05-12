import Fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import cors from "fastify-cors";
import path from 'path';
import {getCertJson, getCertInfo} from '@localhapp/cert-info/index.js';

import {startDns} from './dns.js';
import {getHosts, removeHosts, setHosts, startLocalhappServer, setConfigHost} from "./server.js";
import internalIp from "internal-ip";

console.log(getCertInfo());

const GUI = path.join(path.resolve(), 'dist_gui');
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
        console.log(" --- GET ", getHosts());
        reply.send(getHosts());
    });
    configServer.post('/api', async (request, reply) => {
        console.log("post");
        const response = setHosts(request.body);
        console.log("end");
        reply.send({response, hosts: getHosts()});
    });
    configServer.delete('/api', async (request, reply) => {
        console.log("|> |>    |> DELETE");
        const response = removeHosts(request.body);
        reply.send({response, hosts: getHosts()});
    });
    configServer.get('/api/ip', async (request, reply) => {
        reply.send(await internalIp.v4());
    });
    configServer.get('/api/certificate', async (request, reply) => {
        reply.send(getCertJson());
    });



    // TODO: listen on localhost only or available on the network
}
const getLocalIp = async () => {
    return await internalIp.v4();
}

const startServer = (PORT = 8041) => {
    configServer.listen(PORT).then(async () => {
        console.log("started configserver https://config.localh.app");
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