import Fastify from 'fastify';
import fastifyStatic from 'fastify-static'
import cors from "fastify-cors";
import os from 'os';
import path from 'path';

import {getHosts, removeHosts, setHosts, startLocalhappServer, setConfigHost} from "./server.js";
const GUI = path.join(path.resolve(), 'gui_dist');

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
    })
    configServer.post('/api', async (request, reply) => {
        console.log("post");
        const response = setHosts(request.body);
        console.log("end");
        reply.send({response, hosts: getHosts()});
    })
    configServer.delete('/api', async (request, reply) => {
        console.log("|> |>    |> DELETE");
        const response = removeHosts(request.body);
        reply.send({response, hosts: getHosts()});
    })
    // TODO: listen on localhost only or available on the network
}

const startServer = (PORT = 8041) => {
    configServer.listen(PORT).then(() => {
        console.log("started configserver");
    });
    startLocalhappServer();
}

export {
    setApiServer,
    setGuiServer,
    startServer
}