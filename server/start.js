#!/usr/bin/env node
import {setApiServer, setGuiServer, startDns, startServer, getLocalIp} from './index.js';

getLocalIp().then(async (localIp) => {
    setGuiServer();
    setApiServer();
    await startServer();
    startDns(localIp);
})
