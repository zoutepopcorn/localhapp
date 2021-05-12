#!/usr/bin/env node
import {setApiServer, setGuiServer, startDns, startServer, getLocalIp} from './index.js';

getLocalIp().then((localIp) => {
    setGuiServer();
    setApiServer();
    startServer();
    startDns(localIp);
})
